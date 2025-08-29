import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ITEM_MAP } from "../../../data/items";
import { BossService } from "../../boss-service";
import { Boss } from "../../models/boss";
import { SimulationService } from "../../simulation-service";
import { DropTable } from "./drop-table/drop-table";
import { ModeSelectCard } from "./mode-select-card/mode-select-card";
import { SimulationConfig } from "./simulation-configuration";

export function requiredIfEnabled(): ValidatorFn {
  return (control: AbstractControl) => {
    if (
      control.enabled &&
      (control.value === null ||
        control.value === undefined ||
        control.value === "")
    ) {
      return { required: true };
    }
    return null;
  };
}

@Component({
  selector: "app-configuration-page",
  imports: [ReactiveFormsModule, CommonModule, ModeSelectCard, DropTable],
  templateUrl: "./configuration-page.html",
  styleUrl: "./configuration-page.scss",
})
export class ConfigurationPage {
  boss = signal<Boss | undefined>(undefined);
  form: FormGroup;

  private router = inject(Router);
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  bossItems = computed(() =>
    this.boss()!.dropTable.map((item) => ITEM_MAP.get(item.id)!),
  );

  constructor() {
    this.form = new FormGroup({
      mode: new FormControl<string | null>(null, Validators.required),
      numberOfKills: new FormControl<number | null>(null, [
        requiredIfEnabled(),
      ]),
      numberOfItems: new FormArray([], { validators: [requiredIfEnabled()] }),
    });
  }

  ngOnInit() {
    this.boss.set(this.bossService.selectedBoss());

    const numberOfItemsArray = this.form.get("numberOfItems") as FormArray;
    this.bossItems().forEach((item, index) => {
      const control = new FormControl({ value: 0, disabled: true }, [
        Validators.min(0),
        Validators.required,
      ]);
      numberOfItemsArray.push(control);
    });

    this.form.get("mode")?.valueChanges.subscribe((mode) => {
      ["numberOfKills", "numberOfItems"].forEach((control) =>
        this.form.get(control)?.disable(),
      );
      if (mode === "numberOfKills") this.form.get("numberOfKills")?.enable();
      if (mode === "numberOfItems") this.form.get("numberOfItems")?.enable();
    });
  }

  get numberOfItemsArray() {
    return this.form.get("numberOfItems") as FormArray<FormControl<number>>;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const config = this.form.value as SimulationConfig;
    this.simulationService.config = config;

    this.router.navigate(["/", this.boss()?.id, "simulation"]);
  }
}
