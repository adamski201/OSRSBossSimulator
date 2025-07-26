import { Component, inject, OnInit } from "@angular/core";
import { Boss } from "../../models/boss";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { BOSSES } from "../../data/bosses";
import { SimulationService } from "../../services/simulation-service";
import { SimulationResult } from "../../simulation-engine/models/simulation-result";
import { Item } from "../../models/item";
import { ITEM_MAP } from "../../data/items";

@Component({
  selector: "app-simulation",
  imports: [RouterModule],
  templateUrl: "./simulation.html",
  styleUrl: "./simulation.scss",
})
export class Simulation implements OnInit {
  boss!: Boss;
  route = inject(ActivatedRoute);
  simulationService = inject(SimulationService);
  simulation: SimulationResult | undefined;
  drops: Item[] = [];

  ngOnInit() {
    const bossId = this.route.snapshot.paramMap.get("boss")!;
    this.boss = BOSSES.find((b) => b.id === bossId)!;
    this.simulation = this.simulationService.simulate(this.boss, 1000);
    this.drops = this.simulation.drops.map((drop) => ITEM_MAP.get(drop.id)!);
  }
}
