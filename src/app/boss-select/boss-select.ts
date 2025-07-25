import { Component, computed, signal } from "@angular/core";
import { BossCard } from "./boss-card/boss-card";
import { CardItem } from "./boss-card/models/card-item";

@Component({
  selector: "app-boss-select",
  imports: [BossCard],
  templateUrl: "./boss-select.html",
  styleUrl: "./boss-select.scss",
})
export class BossSelect {
  bossCards: CardItem[] = [
    {
      id: "corrupted-gauntlet",
      name: "Corrupted Gauntlet",
      imageUrl: "boss-images/corrupted-gauntlet.webp",
    },
    {
      id: "kbd",
      name: "King Black Dragon",
      imageUrl: "boss-images/king-black-dragon.webp",
    },
    {
      id: "zulrah",
      name: "Zulrah",
      imageUrl: "boss-images/zulrah.webp",
    },
    {
      id: "barrows",
      name: "Barrows",
      imageUrl: "boss-images/barrows.webp",
    },
    {
      id: "vardorvis",
      name: "Vardorvis",
      imageUrl: "boss-images/vardorvis.webp",
    },
    {
      id: "scurrius",
      name: "Scurrius",
      imageUrl: "boss-images/scurrius.webp",
    },
  ];

  public bossFilter = signal<string>("");

  public filteredBosses = computed(() => {
    return this.bossCards.filter((boss) =>
      boss.name.toLowerCase().includes(this.bossFilter()),
    );
  });

  public onSearchUpdated(query: string) {
    this.bossFilter.set(query.toLowerCase());
  }
}
