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
import { SimulationConfig } from "../configure/simulation-configuration";

@Component({
  selector: "app-simulation-average-page",
  imports: [RouterModule],
  templateUrl: "./simulation-average-page.html",
  styleUrl: "./simulation-average-page.scss",
})
export class SimulationAveragePage {
  boss = signal<Boss | undefined>(undefined);
  simulation: SimulationResult | AveragedSimulationResult;
  items: Item[] = [];
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  constructor() {
    const state = history.state;
    const config = state.config as SimulationConfig;

    this.boss.set(this.bossService.selectedBoss());

    this.simulation = this.simulationService.runAveraged(this.boss()!, config);

    const itemIds = this.simulation.dropQuantities.keys();
    this.items = Array.from(itemIds).map((id) => ITEM_MAP.get(id)!);
  }
}
