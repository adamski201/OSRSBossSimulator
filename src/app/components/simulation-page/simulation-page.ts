import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { BOSSES } from "../../data/bosses";
import { Boss } from "../../models/boss";
import { SimulationService } from "../../services/simulation-service";
import { SimulationResult } from "../../simulation-engine/models/simulation-result";
import { SimulationTimeline } from "./simulation-timeline/simulation-timeline";

@Component({
  selector: "app-simulation-page",
  imports: [RouterModule, SimulationTimeline],
  templateUrl: "./simulation-page.html",
  styleUrl: "./simulation-page.scss",
})
export class SimulationPage {
  boss: Boss;
  route = inject(ActivatedRoute);
  simulationService = inject(SimulationService);
  simulation: SimulationResult;

  constructor() {
    const bossId = this.route.snapshot.paramMap.get("boss")!;
    this.boss = BOSSES.find((b) => b.id === bossId)!;
    this.simulation = this.simulationService.simulate(this.boss, 500);
  }
}
