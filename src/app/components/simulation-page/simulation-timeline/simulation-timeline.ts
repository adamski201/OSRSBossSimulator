import { Component, computed, input } from "@angular/core";
import { SimulationResult } from "../../../simulation-engine/models/simulation-result";
import { DropView } from "../../../models/drop-view";
import { ITEM_MAP } from "../../../data/items";
import { Kill } from "../../../models/kill";
import { Drop } from "../../../simulation-engine/models/drop";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-simulation-timeline",
  imports: [CommonModule],
  templateUrl: "./simulation-timeline.html",
  styleUrl: "./simulation-timeline.scss",
})
export class SimulationTimeline {
  simulation = input.required<SimulationResult>();

  greenlogKc = computed(() => {
    return this.simulation().greenLogKillCount;
  });

  drops = computed(() => {
    return this.simulation().drops.map((drop) => ({
      kc: drop.kc,
      item: ITEM_MAP.get(drop.id)!,
      isGreenlogDrop:
        this.simulation().uniqueFirstObtainedAt.get(drop.id) === drop.kc,
    })) as DropView[];
  });

  kills = computed(() => {
    const kills: Kill[] = [];

    const drops = [...this.simulation().drops].reverse();

    for (let kc = 1; kc <= this.simulation().killCount; kc++) {
      const currentDrops: DropView[] = [];

      while (drops.length > 0 && drops[drops.length - 1].kc === kc) {
        const drop: Drop = drops.pop()!;

        currentDrops.push({
          kc: drop.kc,
          item: ITEM_MAP.get(drop.id)!,
          isGreenlogDrop:
            this.simulation().uniqueFirstObtainedAt.get(drop.id) === drop.kc,
        });
      }

      const isFirstTimeDrop = currentDrops.some((d) => d.isGreenlogDrop);

      kills.push({
        kc,
        drops: currentDrops,
        isGreenlogKill: isFirstTimeDrop,
      });
    }

    return kills;
  });
}
