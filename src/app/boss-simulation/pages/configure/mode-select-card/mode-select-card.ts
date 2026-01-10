import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-mode-select-card",
  templateUrl: "./mode-select-card.html",
  styleUrl: "./mode-select-card.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeSelectCard {
  title = input.required<string>();
  description = input.required<string>();
  imageUrl = input<string | null>(null);
  isSelected = input<boolean>(false);
}
