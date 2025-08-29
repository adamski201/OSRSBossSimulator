import { Component, input, output } from "@angular/core";
import { Item } from "../../../models/item";
import { FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";

export interface ItemQuantity {
  item: Item;
  quantity: number;
}

@Component({
  selector: "app-drop-table",
  imports: [ReactiveFormsModule],
  templateUrl: "./drop-table.html",
  styleUrl: "./drop-table.scss",
})
export class DropTable {
  items = input.required<Item[]>();
  formArray = input<FormArray<FormControl<number>>>();
  quantities = input<number[]>();

  get isReadonly(): boolean {
    return !this.formArray() && !!this.quantities();
  }
}
