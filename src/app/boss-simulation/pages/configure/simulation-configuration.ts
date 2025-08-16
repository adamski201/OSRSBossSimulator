export type ItemQuantities = Map<number, number>;
export type SimulationConfig =
  | { mode: "greenlog" }
  | { mode: "numberOfKills"; numberOfKills: number }
  | { mode: "numberOfItems"; items: ItemQuantities };
