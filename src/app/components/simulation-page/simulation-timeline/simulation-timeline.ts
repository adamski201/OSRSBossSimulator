import { Component, computed, effect, input, signal } from "@angular/core";
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
  ANIMATION_DELAY = 5;

  drops = computed(() => {
    return this.simulation().drops.map((drop) => ({
      kc: drop.kc,
      item: ITEM_MAP.get(drop.id)!,
      isGreenlogDrop:
        this.simulation().uniqueFirstObtainedAt.get(drop.id) === drop.kc,
    })) as DropView[];
  });

  // Converts the simulation's drops into a timeline of kills
  // Each kill contains its own drops and whether it was the first time an item dropped
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

  constructor() {
    effect((): void => {
      this.backgroundVisible.set(false);
      const delay = this.maxAnimationDelay();
      if (delay === 0) return;

      setTimeout(() => {
        this.backgroundVisible.set(true);
      }, delay + 200);
    });
  }

  backgroundVisible = signal(false);

  maxAnimationDelay = computed(() => {
    const allKills = this.kills();
    if (!allKills.length) return 0;
    return allKills[allKills.length - 1].kc * this.ANIMATION_DELAY;
  });
}
