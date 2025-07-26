import { DropLogic } from "../simulation-engine/drop-logic/drop-logic";
import { DropTableItem } from "./drop-table-item";

export interface Boss {
  id: string;
  name: string;
  imageUrl: string;
  dropTable: DropTableItem[];
  dropLogic?: DropLogic;
}
