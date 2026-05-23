import { Observable } from "rxjs";
import { Boss } from "../features/boss-simulation/models/boss";
import { StandardDropLogic } from "./drop-logic/standard-drop-logic";
import {
  AveragedSimulationResult,
  SimulationResult,
} from "./models/simulation-result";
import { RandomProvider } from "./random-provider";
import { SimulationContext } from "./simulation-context";

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

  runForKillsAveraged$(
    boss: Boss,
    totalKills: number,
    trials = 100_000,
    chunkSize = 500,
  ): Observable<AveragedSimulationResult & { progress: number }> {
    return new Observable((observer) => {
      const worker = new Worker(
        new URL("./simulation.worker.ts", import.meta.url),
        { type: "module" },
      );

      worker.onmessage = ({ data }) => {
        const averagedDropQuantities = new Map<number, number>();
        data.dropQuantities.forEach((qty: number, itemId: number) => {
          averagedDropQuantities.set(itemId, qty / data.completed);
        });

        observer.next({
          killCount: totalKills,
          dropQuantities: averagedDropQuantities,
          progress: data.completed / trials,
        });

        if (data.type === "complete") {
          observer.complete();
          worker.terminate();
        }
      };

      worker.onerror = (err) => observer.error(err);
      worker.postMessage({ boss, totalKills, trials, chunkSize });
      return () => worker.terminate();
    });
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

  // runUntilGreenlogAveraged(
  //   boss: Boss,
  //   trials = 100_000,
  // ): AveragedSimulationResult {
  //   let kc = 0;
  //   const dropQuantities = new Map<number, number>();

  //   for (let i = 0; i < trials; i++) {
  //     const result = this.runUntilGreenlog(boss);

  //     kc += result.killCount;
  //     result.dropQuantities.forEach((qty, itemId) => {
  //       dropQuantities.set(itemId, dropQuantities.get(itemId) ?? 0 + qty);
  //     });
  //   }

  //   return { killCount: kc / trials, dropQuantities };
  // }

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

  // runUntilItemsAveraged(
  //   boss: Boss,
  //   itemQuantities: Map<number, number>,
  //   trials = 100000,
  // ): AveragedSimulationResult {
  //   let kc = 0;
  //   const dropQuantities = new Map<number, number>();

  //   for (let i = 0; i < trials; i++) {
  //     const result = this.runUntilItems(boss, itemQuantities);

  //     kc += result.killCount;
  //     result.dropQuantities.forEach((qty, itemId) => {
  //       dropQuantities.set(itemId, dropQuantities.get(itemId) ?? 0 + qty);
  //     });
  //   }

  //   return { killCount: kc / trials, dropQuantities };
  // }

  private getStandardDropLogic() {
    return new StandardDropLogic(new RandomProvider());
  }
}
