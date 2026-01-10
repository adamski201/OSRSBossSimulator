import { JsonPipe } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import {
  AbstractControl,
  ReactiveFormsModule,
  ValidatorFn,
} from "@angular/forms";
import {
  form,
  FormField,
  hidden,
  max,
  min,
  required,
  submit,
} from "@angular/forms/signals";
import { Router } from "@angular/router";
import { ITEM_MAP } from "../../../data/items";
import { BossService } from "../../boss-service";
import { Boss } from "../../models/boss";
import { SimulationService } from "../../simulation-service";
import { ModeSelectCard } from "./mode-select-card/mode-select-card";
import {
  SimulationConfig,
  SimulationMode,
  SimulationTarget,
} from "./simulation-configuration";

interface SimulationFormModel {
  simulationMode: SimulationMode;
  targetMode: SimulationTarget;
  numberOfKills: number;
  numberOfItems: number[];
  iterations: number;
}

@Component({
  selector: "app-configuration-page",
  imports: [FormField, ReactiveFormsModule, ModeSelectCard],
  templateUrl: "./configuration-page.html",
  styleUrl: "./configuration-page.scss",
})
export class ConfigurationPage {
  boss = signal<Boss | undefined>(undefined);

  private router = inject(Router);
  private bossService = inject(BossService);
  private simulationService = inject(SimulationService);

  private model = signal<SimulationFormModel>({
    simulationMode: SimulationMode.Timeline,
    targetMode: SimulationTarget.Greenlog,
    numberOfKills: 100,
    numberOfItems: [],
    iterations: 10000,
  });

  simulationForm = form(this.model, (simulation) => {
    min(simulation.numberOfKills, 1, { message: "Must be at least 1" });
    max(simulation.numberOfKills, 100000, {
      message: "Must be at most 100,000",
    });
    min(simulation.iterations, 10000, { message: "Must be at least 10,000" });
    max(simulation.iterations, 500000, { message: "Must be at most 500,000" });
    required(simulation.numberOfItems);
    hidden(
      simulation.iterations,
      ({ valueOf }) =>
        valueOf(simulation.simulationMode) !== SimulationMode.Average,
    );
    hidden(
      simulation.numberOfItems,
      ({ valueOf }) =>
        valueOf(simulation.targetMode) !== SimulationTarget.NumberOfItems,
    );
    hidden(
      simulation.numberOfKills,
      ({ valueOf }) =>
        valueOf(simulation.targetMode) !== SimulationTarget.NumberOfKills,
    );
  });

  bossItems = computed(() =>
    this.boss()!.dropTable.map((item) => ITEM_MAP.get(item.id)!),
  );

  ngOnInit() {
    this.boss.set(this.bossService.selectedBoss());
  }

  onSubmit() {
    submit(this.simulationForm, async (form) => {
      this.simulationService.setConfig(
        this.mapFormToDomainModel(form().value()),
      );
      this.router.navigate(["/", this.boss()?.id, "simulation"]);
    });
  }

  private mapFormToDomainModel(value: SimulationFormModel): SimulationConfig {
    const items = new Map(
      value.numberOfItems.map((quantity, index) => [
        this.bossItems()[index].id,
        quantity,
      ]),
    );

    return {
      simulationMode: value.simulationMode,
      targetMode: value.targetMode,
      numberOfKills: value.numberOfKills,
      items,
      iterations: value.iterations,
    };
  }
}
