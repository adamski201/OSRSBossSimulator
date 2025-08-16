import { Injectable } from "@angular/core";
import { SimulationResult } from "../../../simulation-engine/models/simulation-result";
import { SimulationEngine } from "../../../simulation-engine/simulation-engine";
import { Boss } from "../../models/boss";
import { SimulationConfig } from "../configure/simulation-configuration";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  public boss: Boss | undefined = undefined;

  private simulationEngine = new SimulationEngine();

  run(boss: Boss, config: SimulationConfig): SimulationResult {
    if (config.mode === "greenlog") {
      return this.simulateUntilGreenlog(boss);
    } else if (config.mode === "numberOfKills") {
      return this.simulateForKills(boss, config.numberOfKills);
    } else if (config.mode === "numberOfItems") {
      return this.simulateUntilItems(boss, config.items);
    }

    // Fallback to greenlog if no valid mode is provided
    return this.simulateUntilGreenlog(boss);
  }

  simulateUntilGreenlog(boss: Boss): SimulationResult {
    return this.simulationEngine.runUntilGreenlog(boss);
  }

  simulateForKills(boss: Boss, kc: number): SimulationResult {
    return this.simulationEngine.runForKills(boss, kc);
  }

  simulateUntilItems(
    boss: Boss,
    itemQuantities: Map<number, number>,
  ): SimulationResult {
    return this.simulationEngine.runUntilItems(boss, itemQuantities);
  }
}
