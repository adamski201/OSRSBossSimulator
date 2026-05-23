import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";

@Component({
  selector: "app-mode-select-card",
  templateUrl: "./mode-select-card.html",
  styleUrl: "./mode-select-card.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeSelectCard implements FormValueControl<string> {
  value = model("");

  title = input.required<string>();
  mode = input.required<string>();
  description = input.required<string>();
  imageUrl = input<string | null>(null);
  isSelected = input<boolean>(false);

  select() {
    this.value.set(this.mode());
  }
}
