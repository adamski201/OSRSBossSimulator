import { Component, input, output } from "@angular/core";
import { CardItem } from "./card-item";

@Component({
  selector: "app-boss-card",
  templateUrl: "./boss-card.html",
  styleUrl: "./boss-card.scss",
})
export class BossCard {
  item = input.required<CardItem>();

  select = output<string>();

  selectItem() {
    this.select.emit(this.item().id);
  }
}
