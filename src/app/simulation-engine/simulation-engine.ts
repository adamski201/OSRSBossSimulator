import { Boss } from "../boss-simulation/models/boss";
import { StandardDropLogic } from "./drop-logic/standard-drop-logic";
import { SimulationResult } from "./models/simulation-result";
import { RandomProvider } from "./random-provider";
import { SimulationContext } from "./simulation-context";

export class SimulationEngine {
  runForKills(boss: Boss, totalKills: number): SimulationResult {
    const dropTable = boss.dropTable;
    const dropLogic = boss.dropLogic ?? this.getStandardDropLogic();
    const numUniques = dropTable.length;

    const simulationContext = new SimulationContext(numUniques);

    for (let i = 0; i < totalKills; i++) {
      simulationContext.kc++;
      const drops = dropLogic.roll(dropTable, simulationContext);
      drops.forEach((drop) => simulationContext.addDrop(drop));
    }

    return {
      bossId: boss.id,
      killCount: simulationContext.kc,
      drops: simulationContext.drops,
      greenLogKillCount: simulationContext.greenLogKc,
      dropQuantities: simulationContext.dropQuantities,
      uniqueFirstObtainedAt: simulationContext.uniqueFirstObtainedAt,
      isGreenLogComplete: !!simulationContext.greenLogKc,
    };
  }

  runUntilGreenlog(boss: Boss): SimulationResult {
    const dropTable = boss.dropTable;
    const dropLogic = boss.dropLogic ?? this.getStandardDropLogic();
    const numUniques = dropTable.length;

    const simulationContext = new SimulationContext(numUniques);

    while (!simulationContext.greenLogKc) {
      simulationContext.kc++;
      const drops = dropLogic.roll(dropTable, simulationContext);
      drops.forEach((drop) => simulationContext.addDrop(drop));
    }

    return {
      bossId: boss.id,
      killCount: simulationContext.kc,
      drops: simulationContext.drops,
      greenLogKillCount: simulationContext.greenLogKc,
      dropQuantities: simulationContext.dropQuantities,
      uniqueFirstObtainedAt: simulationContext.uniqueFirstObtainedAt,
      isGreenLogComplete: true,
    };
  }

  runUntilItems(
    boss: Boss,
    itemQuantities: Map<number, number>,
  ): SimulationResult {
    const dropTable = boss.dropTable;
    const dropLogic = boss.dropLogic ?? this.getStandardDropLogic();
    const numUniques = dropTable.length;

    const simulationContext = new SimulationContext(numUniques);

    const missingItems = new Map(itemQuantities);

    while (missingItems.size > 0) {
      simulationContext.kc++;
      const drops = dropLogic.roll(dropTable, simulationContext);

      for (const drop of drops) {
        simulationContext.addDrop(drop);

        const currentQty = simulationContext.dropQuantities.get(drop.id) ?? 0;
        const requiredQty = itemQuantities.get(drop.id);

        if (requiredQty !== undefined && currentQty >= requiredQty) {
          missingItems.delete(drop.id);
        }
      }
    }

    return {
      bossId: boss.id,
      killCount: simulationContext.kc,
      drops: simulationContext.drops,
      greenLogKillCount: simulationContext.greenLogKc,
      dropQuantities: simulationContext.dropQuantities,
      uniqueFirstObtainedAt: simulationContext.uniqueFirstObtainedAt,
      isGreenLogComplete: true,
    };
  }

  private getStandardDropLogic() {
    return new StandardDropLogic(new RandomProvider());
  }
}
