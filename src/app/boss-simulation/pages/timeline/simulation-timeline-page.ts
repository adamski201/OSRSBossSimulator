import { Component, inject, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  AveragedSimulationResult,
  SimulationResult,
} from "../../../simulation-engine/models/simulation-result";
import { Boss } from "../../models/boss";

import { ITEM_MAP } from "../../../data/items";
import { BossService } from "../../boss-service";
import { Item } from "../../models/item";
import { SimulationService } from "../../simulation-service";
import { SimulationTimeline } from "./simulation-timeline/simulation-timeline";
import { SimulationConfig } from "../configure/simulation-configuration";

@Component({
  selector: "app-simulation-timeline-page",
  imports: [RouterModule, SimulationTimeline],
  templateUrl: "./simulation-timeline-page.html",
  styleUrl: "./simulation-timeline-page.scss",
})
export class SimulationTimelinePage {
  boss = signal<Boss | undefined>(undefined);
  simulation: SimulationResult;
  items: Item[] = [];
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  constructor() {
    const state = history.state;
    const config = state.config as SimulationConfig;

    this.boss.set(this.bossService.selectedBoss());

    this.simulation = this.simulationService.run(this.boss()!, config);

    const itemIds = this.simulation.dropQuantities.keys();
    this.items = Array.from(itemIds).map((id) => ITEM_MAP.get(id)!);
  }
}
