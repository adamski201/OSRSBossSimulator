import { Observable } from "rxjs";
import { Boss } from "../features/boss-simulation/models/boss";
import { StandardDropLogic } from "./drop-logic/standard-drop-logic";
import {
  AveragedSimulationResult,
  SimulationResult,
} from "./models/simulation-result";
import { RandomProvider } from "./random-provider";
import { SimulationContext } from "./simulation-context";
import {
  SimulationWorkerRequest,
  SimulationWorkerResponse,
} from "./simulation.worker";

export class SimulationEngine {
  runForKills(boss: Boss, totalKills: number): SimulationResult {
    const dropTable = boss.dropTable;
    const dropLogic = boss.dropLogic ?? this.getStandardDropLogic();
    const numUniques = dropTable.length;

    const simulationContext = new SimulationContext(numUniques);

    for (let i = 0; i < totalKills; i++) {
      simulationContext.kc++;
      const drops = dropLogic.roll(dropTable, simulationContext);
      drops.forEach((drop) => simulationContext.addDrop(drop));
    }

    return {
      killCount: simulationContext.kc,
      drops: simulationContext.drops,
      greenLogKillCount: simulationContext.greenLogKc,
      dropQuantities: simulationContext.dropQuantities,
      uniqueFirstObtainedAt: simulationContext.uniqueFirstObtainedAt,
      isGreenLogComplete: !!simulationContext.greenLogKc,
    };
  }

  runUntilGreenlog(boss: Boss): SimulationResult {
    const dropTable = boss.dropTable;
    const dropLogic = boss.dropLogic ?? this.getStandardDropLogic();
    const numUniques = dropTable.length;

    const simulationContext = new SimulationContext(numUniques);

    while (!simulationContext.greenLogKc) {
      simulationContext.kc++;
      const drops = dropLogic.roll(dropTable, simulationContext);
      drops.forEach((drop) => simulationContext.addDrop(drop));
    }

    return {
      killCount: simulationContext.kc,
      drops: simulationContext.drops,
      greenLogKillCount: simulationContext.greenLogKc,
      dropQuantities: simulationContext.dropQuantities,
      uniqueFirstObtainedAt: simulationContext.uniqueFirstObtainedAt,
      isGreenLogComplete: true,
    };
  }

  runUntilItems(
    boss: Boss,
    itemQuantities: Map<number, number>,
  ): SimulationResult {
    const dropTable = boss.dropTable;
    const dropLogic = boss.dropLogic ?? this.getStandardDropLogic();
    const numUniques = dropTable.length;

    const simulationContext = new SimulationContext(numUniques);

    const missingItems = new Map(itemQuantities);

    while ([...missingItems.values()].some((qty) => qty > 0)) {
      simulationContext.kc++;
      const drops = dropLogic.roll(dropTable, simulationContext);

      for (const drop of drops) {
        simulationContext.addDrop(drop);

        const remaining = missingItems.get(drop.id);
        if (remaining !== undefined && remaining > 0) {
          missingItems.set(drop.id, remaining - 1);
        }
      }
    }

    return {
      killCount: simulationContext.kc,
      drops: simulationContext.drops,
      greenLogKillCount: simulationContext.greenLogKc,
      dropQuantities: simulationContext.dropQuantities,
      uniqueFirstObtainedAt: simulationContext.uniqueFirstObtainedAt,
      isGreenLogComplete: true,
    };
  }

  runForKillsAveraged(
    boss: Boss,
    totalKills: number,
    trials = 100_000,
    chunkSize = 500,
  ): Observable<AveragedSimulationResult> {
    const request: SimulationWorkerRequest = {
      type: "kills",
      boss,
      totalKills,
      trials,
      chunkSize,
    };
    return this.runAveragedSimulation(request);
  }

  runUntilGreenlogAveraged(
    boss: Boss,
    trials = 100_000,
    chunkSize = 500,
  ): Observable<AveragedSimulationResult> {
    const request: SimulationWorkerRequest = {
      type: "greenlog",
      boss,
      trials,
      chunkSize,
    };
    return this.runAveragedSimulation(request);
  }

  runUntilItemsAveraged(
    boss: Boss,
    itemQuantities: Map<number, number>,
    trials = 100_000,
    chunkSize = 500,
  ): Observable<AveragedSimulationResult> {
    const request: SimulationWorkerRequest = {
      type: "items",
      boss,
      itemQuantities,
      trials,
      chunkSize,
    };
    return this.runAveragedSimulation(request);
  }

  private runAveragedSimulation(
    request: SimulationWorkerRequest,
  ): Observable<AveragedSimulationResult> {
    return new Observable((observer) => {
      const worker = new Worker(
        new URL("./simulation.worker.ts", import.meta.url),
        { type: "module" },
      );

      worker.onmessage = ({ data }: MessageEvent<SimulationWorkerResponse>) => {
        const averagedDropQuantities = new Map<number, number>();
        data.dropQuantities.forEach((qty: number, itemId: number) => {
          averagedDropQuantities.set(itemId, qty / data.completed);
        });

        observer.next({
          killCount: data.accumulatedKillCount / data.completed,
          dropQuantities: averagedDropQuantities,
          progress: data.completed / request.trials,
        });

        if (data.type === "complete") {
          observer.complete();
          worker.terminate();
        }
      };

      worker.onerror = (err) => observer.error(err);
      worker.postMessage(request);
      return () => worker.terminate();
    });
  }

  private getStandardDropLogic() {
    return new StandardDropLogic(new RandomProvider());
  }
}
