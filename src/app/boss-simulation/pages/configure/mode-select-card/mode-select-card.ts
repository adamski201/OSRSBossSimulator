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
export class ModeSelectCard implements ControlValueAccessor {
  title = input.required<string>();
  description = input.required<string>();
  imageUrl = input.required<string>();
  private currentValue: string | null = null;

  isSelected = signal(false);
  private onChange = (value: any) => {};
  private onTouched = () => {};

  onCardClick() {
    console.log("Card clicked!", this.currentValue);
    this.onChange(this.currentValue);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.isSelected.set(this.currentValue === value);
    console.log(this.isSelected());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
