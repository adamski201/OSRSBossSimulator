import { Component, computed, signal } from "@angular/core";
import { BossCard } from "./boss-card/boss-card";
import { CardItem } from "../../models/card-item";
import { BOSSES } from "../../data/bosses";

@Component({
  selector: "app-boss-select",
  imports: [BossCard],
  templateUrl: "./boss-select.html",
  styleUrl: "./boss-select.scss",
})
export class BossSelect {
  bossCards: CardItem[] = BOSSES.map((boss) => ({
    id: boss.id,
    name: boss.name,
    imageUrl: boss.imageUrl,
  }));

  public bossFilter = signal<string>("");
  public isOpen = signal<boolean>(true);

  public filteredBosses = computed(() => {
    return this.bossCards.filter((boss) =>
      boss.name.toLowerCase().includes(this.bossFilter()),
    );
  });

  public onSearchUpdated(query: string) {
    this.bossFilter.set(query.toLowerCase());
  }

  public toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }
}
