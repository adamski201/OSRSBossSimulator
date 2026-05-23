import { Component, inject, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AveragedSimulationResult } from "../../../../simulation-engine/models/simulation-result";
import { Boss } from "../../models/boss";

import { AsyncPipe, JsonPipe, KeyValuePipe } from "@angular/common";
import { Observable, tap } from "rxjs";
import { BossService } from "../../boss-service";
import { SimulationService } from "../../simulation-service";
import { SimulationConfig } from "../configure/simulation-configuration";

@Component({
  selector: "app-simulation-average-page",
  imports: [RouterModule, AsyncPipe, KeyValuePipe, JsonPipe],
  templateUrl: "./simulation-average-page.html",
  styleUrl: "./simulation-average-page.scss",
})
export class SimulationAveragePage {
  boss = signal<Boss | undefined>(undefined);
  simulation:
    | Observable<AveragedSimulationResult & { progress: number }>
    | undefined;

  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  constructor() {
    const state = history.state;
    const config = state.config as SimulationConfig;

    this.boss.set(this.bossService.selectedBoss());

    this.simulation = this.simulationService
      .runAveraged(this.boss()!, config)
      .pipe(
        tap((result) => {
          console.log(result);
        }),
      );
  }
}
