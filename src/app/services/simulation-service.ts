import { inject, Injectable } from "@angular/core";
import { Boss } from "../models/boss";
import { SimulationEngine } from "../simulation-engine/simulation-engine";
import { SimulationResult } from "../simulation-engine/models/simulation-result";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  public boss: Boss | undefined = undefined;

  private simulationEngine = new SimulationEngine();

  simulate(boss: Boss, kc: number): SimulationResult {
    return this.simulationEngine.run(boss, kc);
  }

  simulateUntilGreenlog(boss: Boss): SimulationResult {
    return this.simulationEngine.runUntilGreenlog(boss);
  }
}
