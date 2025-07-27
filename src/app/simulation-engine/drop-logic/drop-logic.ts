import { DropTableItem } from "../../models/drop-table-item";
import { Drop } from "../models/drop";
import { SimulationContext } from "../simulation-context";

export interface DropLogic {
  /**
   * Rolls the drop table for a single kill.
   * @param dropTable The drop table for the boss to roll against.
   * @param context Context contaning state of the simulation (e.g. drops so far).
   * @returns A list of item IDs (or full DropItems) that were obtained in this roll.
   */
  roll(dropTable: DropTableItem[], context: SimulationContext): Drop[];
}
