import { Item } from "../features/boss-simulation/models/item";

export const ITEMS: Item[] = [
  { id: 23757, name: "Youngllef", imageUrl: "item-images/youngleff.webp" },
  {
    id: 23956,
    name: "Crystal Armour Seed",
    imageUrl: "item-images/crystal-armour-seed.webp",
  },
  {
    id: 4207,
    name: "Crystal Weapon Seed",
    imageUrl: "item-images/crystal-weapon-seed.webp",
  },
  {
    id: 25859,
    name: "Enhanced Crystal Weapon Seed",
    imageUrl: "item-images/enh.webp",
  },
  { id: 11286, name: "Draconic Visage" },
  { id: 1149, name: "Dragon Med Helm" },
  { id: 12653, name: "Prince Black Dragon" },
  { id: 7980, name: "Kbd heads" },
];

export const ITEM_MAP = new Map(ITEMS.map((item) => [item.id, item]));
