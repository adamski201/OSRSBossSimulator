import { DropTableItem } from "../../models/drop-table-item";
import { Drop } from "../models/drop";
import { RandomProvider } from "../random-provider";
import { SimulationContext } from "../simulation-context";
import { DropLogic } from "./drop-logic";

export class StandardDropLogic implements DropLogic {
  rng: RandomProvider;

  constructor(rngProvider: RandomProvider) {
    this.rng = rngProvider;
  }

  roll(dropTable: DropTableItem[], context: SimulationContext): Drop[] {
    const drops: Drop[] = [];

    dropTable.forEach((item) => {
      const roll = this.rng.roll();
      if (roll < item.rate) {
        drops.push({ id: item.id, kc: context.kc });
      }
    });

    return drops;
  }
}
