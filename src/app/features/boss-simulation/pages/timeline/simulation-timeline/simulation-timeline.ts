import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { ITEM_MAP } from "../../../../../data/items";
import { Drop } from "../../../../../simulation-engine/models/drop";
import { SimulationResult } from "../../../../../simulation-engine/models/simulation-result";
import { DropView } from "./drop-view";
import { Kill } from "./kill";

@Component({
  selector: "app-simulation-timeline",
  imports: [CommonModule],
  templateUrl: "./simulation-timeline.html",
  styleUrl: "./simulation-timeline.scss",
})
export class SimulationTimeline {
  simulation = input.required<SimulationResult>();
  backgroundVisible = signal(false);

  timeline = viewChild.required<ElementRef>("timeline");

  ANIMATION_DELAY = 5;

  maxAnimationDelay = computed(() => {
    return this.kills().length * this.ANIMATION_DELAY;
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

  constructor() {
    effect((): void => {
      this.backgroundVisible.set(false);
      const delay = this.maxAnimationDelay();

      if (delay === 0) return;

      setTimeout(() => {
        this.backgroundVisible.set(true);
        this.timeline().nativeElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, delay + 200);
    });
  }
}
