import { Item } from "../models/item";

export const ITEMS: Item[] = [
  { id: 23757, name: "Youngllef" },
  { id: 23956, name: "Crystal Armour Seed" },
  { id: 4207, name: "Crystal Weapon Seed" },
  { id: 25859, name: "Enhanced Crystal Weapon Seed" },
];

export const ITEM_MAP = new Map(ITEMS.map((item) => [item.id, item]));
