import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-mode-select-card",
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModeSelectCard),
      multi: true,
    },
  ],
  templateUrl: "./mode-select-card.html",
  styleUrl: "./mode-select-card.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeSelectCard {
  title = input.required<string>();
  description = input.required<string>();
  imageUrl = input.required<string>();

  isSelected = input<boolean>(false);
}
