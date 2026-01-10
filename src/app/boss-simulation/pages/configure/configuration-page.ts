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
import { SimulationConfig, SimulationMode } from "./simulation-configuration";

type ConfigurationFormModel = {
  targetMode: FormControl<string | null>;
  numberOfKills: FormControl<number | null>;
  numberOfItems: FormArray<FormControl<number>>;
};

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
  form: FormGroup<ConfigurationFormModel>;

  private router = inject(Router);
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  bossItems = computed(() =>
    this.boss()!.dropTable.map((item) => ITEM_MAP.get(item.id)!),
  );

  constructor() {
    this.form = new FormGroup<ConfigurationFormModel>({
      targetMode: new FormControl<string | null>(null, {
        validators: Validators.required,
        nonNullable: false,
      }),
      numberOfKills: new FormControl<number | null>(null, {
        validators: [requiredIfEnabled()],
        nonNullable: false,
      }),
      numberOfItems: new FormArray<FormControl<number>>([], {
        validators: [requiredIfEnabled()],
      }),
    });
  }

  ngOnInit() {
    this.boss.set(this.bossService.selectedBoss());

    const numberOfItemsArray = this.form.controls.numberOfItems;
    this.bossItems().forEach(() => {
      const control = new FormControl<number>(
        { value: 0, disabled: true },
        {
          validators: [Validators.min(0), Validators.required],
          nonNullable: true,
        },
      );
      numberOfItemsArray.push(control);
    });

    this.form.controls.targetMode.valueChanges.subscribe((mode) => {
      [SimulationMode.NumberOfKills, SimulationMode.NumberOfItems].forEach(
        (control) => this.form.get(control)?.disable(),
      );
      if (mode === SimulationMode.NumberOfKills)
        this.form.controls.numberOfKills?.enable();
      if (mode === SimulationMode.NumberOfItems)
        this.form.controls.numberOfItems?.enable();
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const config = this.form.value as SimulationConfig;

    if (config.mode === SimulationMode.NumberOfItems) {
      const items = new Map(
        (this.form.controls.numberOfItems.value as number[]).map(
          (quantity, index) => [this.bossItems()[index].id, quantity],
        ),
      );
      config.items = items;
    }

    this.simulationService.config = config;
    this.router.navigate(["/", this.boss()?.id, "simulation"]);
  }
}
