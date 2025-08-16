import { DropLogic } from "../../simulation-engine/drop-logic/drop-logic";
import { DropTableItem } from "../../simulation-engine/models/drop-table-item";

export interface Boss {
  id: string;
  name: string;
  imageUrl: string;
  dropTable: DropTableItem[];
  dropLogic?: DropLogic;
}
