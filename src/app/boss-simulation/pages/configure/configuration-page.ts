import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BossService } from "../../boss-service";
import { Boss } from "../../models/boss";
import { SimulationConfig } from "./simulation-configuration";
import { SimulationService } from "../../simulation-service";
import { ModeSelectCard } from "./mode-select-card/mode-select-card";

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
  imports: [ReactiveFormsModule, CommonModule, ModeSelectCard],
  templateUrl: "./configuration-page.html",
  styleUrl: "./configuration-page.scss",
})
export class ConfigurationPage {
  boss = signal<Boss | undefined>(undefined);
  form: FormGroup;

  private router = inject(Router);
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  constructor() {
    this.form = new FormGroup({
      mode: new FormControl("greenlog", Validators.required),
      numberOfKills: new FormControl({ value: null, disabled: true }, [
        requiredIfEnabled(),
      ]),
      numberOfItems: new FormControl({ value: null, disabled: true }, [
        requiredIfEnabled(),
      ]),
    });
  }

  ngOnInit() {
    this.boss.set(this.bossService.selectedBoss());

    this.form.get("mode")?.valueChanges.subscribe((mode) => {
      ["numberOfKills", "numberOfItems"].forEach((control) =>
        this.form.get(control)?.disable(),
      );
      if (mode === "numberOfKills") this.form.get("numberOfKills")?.enable();
      if (mode === "numberOfItems") this.form.get("numberOfItems")?.enable();
    });
  }

  onModeSelect(mode: string) {
    this.form.controls["mode"].setValue(mode);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const config = this.form.value as SimulationConfig;
    this.simulationService.config = config;

    this.router.navigate(["/", this.boss()?.id, "simulation"]);
  }
}
