import { Component, computed, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
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
import { ITEM_MAP } from "../../../../data/items";
import { BossService } from "../../boss-service";
import { Boss } from "../../models/boss";
import { SimulationService } from "../../simulation-service";
import { ModeSelectCard } from "./mode-select-card/mode-select-card";
import {
  SimulationConfig,
  SimulationMode,
  SimulationTarget,
} from "./simulation-configuration";
import { DropTable } from "./drop-table/drop-table";
import { JsonPipe } from "@angular/common";

interface SimulationFormModel {
  simulationMode: SimulationMode;
  targetMode: SimulationTarget;
  numberOfKills: number;
  numberOfItems: Map<number, number>; // Map of item ID to quantity
  iterations: number;
}

@Component({
  selector: "app-configuration-page",
  imports: [FormField, ModeSelectCard, DropTable],
  templateUrl: "./configuration-page.html",
  styleUrl: "./configuration-page.scss",
})
export class ConfigurationPage {
  boss = signal<Boss | undefined>(undefined);

  private router = inject(Router);
  private bossService = inject(BossService);

  private model = signal<SimulationFormModel>({
    simulationMode: SimulationMode.Timeline,
    targetMode: SimulationTarget.Greenlog,
    numberOfKills: 100,
    numberOfItems: new Map<number, number>(),
    iterations: 10000,
  });

  protected simulationForm = form(this.model, (simulation) => {
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

  protected bossItems = computed(() =>
    this.boss()!.dropTable.map((item) => ITEM_MAP.get(item.id)!),
  );

  ngOnInit() {
    this.boss.set(this.bossService.selectedBoss());
  }

  protected onSubmit() {
    submit(this.simulationForm, async (form) => {
      const config = this.mapFormToDomainModel(form().value());

      // Navigate to the appropriate simulation page based on mode
      const routePath =
        config.simulationMode === SimulationMode.Average
          ? "average"
          : "timeline";
      this.router.navigate(["/", this.boss()?.id, "simulation", routePath], {
        state: { config },
      });
    });
  }

  private mapFormToDomainModel(value: SimulationFormModel): SimulationConfig {
    const items = new Map<number, number>();

    for (const [itemId, quantity] of value.numberOfItems.entries()) {
      items.set(itemId, quantity);
    }

    return {
      simulationMode: value.simulationMode,
      targetMode: value.targetMode,
      numberOfKills: value.numberOfKills,
      items,
      iterations: value.iterations,
    };
  }
}
