export type ItemQuantities = Map<number, number>;
export type SimulationConfig =
  | { mode: SimulationMode.Greenlog }
  | { mode: SimulationMode.NumberOfKills; numberOfKills: number }
  | { mode: SimulationMode.NumberOfItems; items: ItemQuantities };

export enum SimulationMode {
  Greenlog = "greenlog",
  NumberOfKills = "numberOfKills",
  NumberOfItems = "numberOfItems",
}
