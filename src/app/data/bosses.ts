import { Boss } from "../models/boss";

export const BOSSES: Boss[] = [
  {
    id: "corrupted-gauntlet",
    name: "Corrupted Gauntlet",
    imageUrl: "boss-images/corrupted-gauntlet.webp",
    dropTable: [
      { id: 23757, name: "Youngllef", rate: 1 / 800 },
      { id: 23956, name: "Crystal Armour Seed", rate: 1 / 50 },
      { id: 4207, name: "Crystal Weapon Seed", rate: 1 / 50 },
      { id: 25859, name: "Enhanced Crystal Weapon Seed", rate: 1 / 400 },
    ],
  },
  {
    id: "kbd",
    name: "King Black Dragon",
    imageUrl: "boss-images/king-black-dragon.webp",
    dropTable: [
      { id: 11286, name: "Draconic Visage", rate: 1 / 5000 },
      { id: 1149, name: "Dragon Med Helm", rate: 1 / 128 },
      { id: 12653, name: "Prince Black Dragon", rate: 1 / 3000 },
      { id: 7980, name: "Kbd heads", rate: 1 / 128 },
    ],
  },
  {
    id: "zulrah",
    name: "Zulrah",
    imageUrl: "boss-images/zulrah.webp",
    dropTable: [],
  },
  {
    id: "barrows",
    name: "Barrows",
    imageUrl: "boss-images/barrows.webp",
    dropTable: [],
  },
  {
    id: "vardorvis",
    name: "Vardorvis",
    imageUrl: "boss-images/vardorvis.webp",
    dropTable: [],
  },
  {
    id: "scurrius",
    name: "Scurrius",
    imageUrl: "boss-images/scurrius.webp",
    dropTable: [],
  },
];
