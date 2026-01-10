import { Component, computed, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { BOSSES } from "../../../data/bosses";
import { BossCard } from "./boss-card/boss-card";
import { CardItem } from "./boss-card/card-item";
import { BossService } from "../../boss-service";

@Component({
  selector: "app-boss-select",
  imports: [BossCard, RouterModule],
  templateUrl: "./boss-select.html",
  styleUrl: "./boss-select.scss",
})
export class BossSelect {
  private router = inject(Router);
  private bossService = inject(BossService);

  bossCards: CardItem[] = BOSSES.map((boss) => ({
    id: boss.id,
    name: boss.name,
    imageUrl: boss.imageUrl,
  }));

  bossFilter = signal<string>("");
  isOpen = signal<boolean>(true);

  filteredBosses = computed(() => {
    return this.bossCards.filter((boss) =>
      boss.name.toLowerCase().includes(this.bossFilter()),
    );
  });

  onSelect(bossId: string) {
    this.bossService.setBoss(BOSSES.find((b) => b.id === bossId)!);
    this.router.navigate(["/", bossId, "configure"]);
  }

  onSearchUpdated(query: string) {
    this.bossFilter.set(query.toLowerCase());
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }
}
