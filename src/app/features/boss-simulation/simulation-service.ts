import { Injectable } from "@angular/core";
import {
  AveragedSimulationResult,
  SimulationResult,
} from "../../simulation-engine/models/simulation-result";
import { SimulationEngine } from "../../simulation-engine/simulation-engine";
import { Boss } from "./models/boss";
import {
  SimulationConfig,
  SimulationTarget,
} from "./pages/configure/simulation-configuration";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  public boss: Boss | undefined = undefined;

  private simulationEngine = new SimulationEngine();

  run(boss: Boss, cfg: SimulationConfig): SimulationResult {
    if (cfg?.targetMode === SimulationTarget.Greenlog) {
      return this.simulateUntilGreenlog(boss);
    } else if (
      cfg?.targetMode === SimulationTarget.NumberOfKills &&
      cfg.numberOfKills
    ) {
      return this.simulateForKills(boss, cfg.numberOfKills);
    } else if (
      cfg?.targetMode === SimulationTarget.NumberOfItems &&
      cfg.items
    ) {
      return this.simulateUntilItems(boss, cfg.items);
    }

    return this.simulateUntilGreenlog(boss);
  }

  runAveraged(
    boss: Boss,
    cfg: SimulationConfig,
  ): Observable<AveragedSimulationResult & { progress: number }> {
    if (cfg?.targetMode === SimulationTarget.Greenlog) {
      //return this.simulateUntilGreenlogAveraged(boss);
    } else if (
      cfg?.targetMode === SimulationTarget.NumberOfKills &&
      cfg.numberOfKills
    ) {
      return this.simulationEngine.runForKillsAveraged$(
        boss,
        cfg.numberOfKills,
        1_000_000,
      );
    } else if (
      cfg?.targetMode === SimulationTarget.NumberOfItems &&
      cfg.items
    ) {
      //return this.simulateUntilItemsAveraged(boss, cfg.items);
    }

    return this.simulationEngine.runForKillsAveraged$(boss, 1);
  }

  private simulateUntilGreenlog(boss: Boss): SimulationResult {
    return this.simulationEngine.runUntilGreenlog(boss);
  }

  private simulateForKills(boss: Boss, kc: number): SimulationResult {
    return this.simulationEngine.runForKills(boss, kc);
  }

  private simulateUntilItems(
    boss: Boss,
    itemQuantities: Map<number, number>,
  ): SimulationResult {
    return this.simulationEngine.runUntilItems(boss, itemQuantities);
  }
}
