import { Component, computed, input, model } from "@angular/core";
import { Item } from "../../../models/item";
import { FormValueControl } from "@angular/forms/signals";

@Component({
  selector: "app-drop-table",
  imports: [],
  templateUrl: "./drop-table.html",
  styleUrl: "./drop-table.scss",
})
export class DropTable implements FormValueControl<Map<number, number>> {
  value = model.required<Map<number, number>>();
  items = input.required<Item[]>();

  protected onQuantityChange(itemId: number, newQuantity: number): void {
    this.value.update((current) => {
      return new Map(current).set(itemId, newQuantity);
    });
  }
}
