import { Component } from "@angular/core";
import { CardItem } from "./boss-card/models/card-item";
import { BossCard } from "./boss-card/boss-card";

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
  ];
}
