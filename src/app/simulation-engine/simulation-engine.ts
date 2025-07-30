import { Boss } from "../models/boss";
import { StandardDropLogic } from "./drop-logic/standard-drop-logic";
import { SimulationResult } from "./models/simulation-result";
import { RandomProvider } from "./random-provider";
import { SimulationContext } from "./simulation-context";

export class SimulationEngine {
  run(boss: Boss, totalKills: number): SimulationResult {
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

  private getStandardDropLogic() {
    return new StandardDropLogic(new RandomProvider());
  }
}
