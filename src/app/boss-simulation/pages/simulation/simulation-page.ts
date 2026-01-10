import { Component, inject, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SimulationResult } from "../../../simulation-engine/models/simulation-result";
import { Boss } from "../../models/boss";

import { ITEM_MAP } from "../../../data/items";
import { BossService } from "../../boss-service";
import { Item } from "../../models/item";
import { SimulationService } from "../../simulation-service";
import { SimulationTimeline } from "./timeline/simulation-timeline";

@Component({
  selector: "app-simulation-page",
  imports: [RouterModule, SimulationTimeline],
  templateUrl: "./simulation-page.html",
  styleUrl: "./simulation-page.scss",
})
export class SimulationPage {
  boss = signal<Boss | undefined>(undefined);
  simulation: SimulationResult;
  items: Item[] = [];
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  res: any;

  constructor() {
    this.boss.set(this.bossService.selectedBoss());
    this.simulation = this.simulationService.run(this.boss()!);

    const itemIds = this.simulation.dropQuantities.keys();
    this.items = Array.from(itemIds).map((id) => ITEM_MAP.get(id)!);
  }
}
