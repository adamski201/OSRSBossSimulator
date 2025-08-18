import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimulationResult } from "../../../simulation-engine/models/simulation-result";
import { Boss } from "../../models/boss";

import { BossService } from "../../boss-service";
import { SimulationConfig } from "../configure/simulation-configuration";
import { SimulationTimeline } from "./timeline/simulation-timeline";
import { SimulationService } from "../../simulation-service";

@Component({
  selector: "app-simulation-page",
  imports: [RouterModule, SimulationTimeline],
  templateUrl: "./simulation-page.html",
  styleUrl: "./simulation-page.scss",
})
export class SimulationPage {
  boss = signal<Boss | undefined>(undefined);
  simulationConfig: SimulationConfig;
  route = inject(ActivatedRoute);
  simulation: SimulationResult;
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.boss.set(this.bossService.selectedBoss());
    this.simulationConfig = this.activatedRoute.snapshot.data["config"];
    this.simulation = this.simulationService.run(this.boss()!);
  }
}
