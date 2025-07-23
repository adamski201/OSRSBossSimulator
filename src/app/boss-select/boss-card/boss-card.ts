import { Component, input } from "@angular/core";
import { CardItem } from "./models/card-item";

@Component({
  selector: "app-boss-card",
  imports: [],
  templateUrl: "./boss-card.html",
  styleUrl: "./boss-card.scss",
})
export class BossCard {
  item = input.required<CardItem>();
}
