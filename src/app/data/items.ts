import { Item } from "../models/item";

export const ITEMS: Item[] = [
  { id: 23757, name: "Youngllef" },
  { id: 23956, name: "Crystal Armour Seed" },
  { id: 4207, name: "Crystal Weapon Seed" },
  { id: 25859, name: "Enhanced Crystal Weapon Seed" },
  { id: 11286, name: "Draconic Visage" },
  { id: 1149, name: "Dragon Med Helm" },
  { id: 12653, name: "Prince Black Dragon" },
  { id: 7980, name: "Kbd heads" },
];

export const ITEM_MAP = new Map(ITEMS.map((item) => [item.id, item]));
