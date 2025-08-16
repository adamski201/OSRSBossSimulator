import { Item } from "../../../models/item";

export interface DropView {
  kc: number;
  item: Item;
  isGreenlogDrop?: boolean;
}
