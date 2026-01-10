import { Injectable } from "@angular/core";
import { SimulationResult } from "../simulation-engine/models/simulation-result";
import { SimulationEngine } from "../simulation-engine/simulation-engine";
import { Boss } from "./models/boss";
import { SimulationConfig } from "./pages/configure/simulation-configuration";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  public boss: Boss | undefined = undefined;
  private config: SimulationConfig | undefined = undefined;

  private simulationEngine = new SimulationEngine();

  run(boss: Boss): SimulationResult {
    const cfg = this.config;

    if (cfg?.targetMode === "greenlog") {
      return this.simulateUntilGreenlog(boss);
    } else if (cfg?.targetMode === "numberOfKills" && cfg.numberOfKills) {
      return this.simulateForKills(boss, cfg.numberOfKills);
    } else if (cfg?.targetMode === "numberOfItems" && cfg.items) {
      return this.simulateUntilItems(boss, cfg.items);
    }

    // Fallback to greenlog if no valid mode is provided
    return this.simulateUntilGreenlog(boss);
  }

  setConfig(config: SimulationConfig) {
    this.config = config;
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
