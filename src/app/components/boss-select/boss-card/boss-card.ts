import { Component, input } from "@angular/core";
import { CardItem } from "../../../models/card-item";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-boss-card",
  imports: [RouterLink],
  templateUrl: "./boss-card.html",
  styleUrl: "./boss-card.scss",
})
export class BossCard {
  item = input.required<CardItem>();
}
