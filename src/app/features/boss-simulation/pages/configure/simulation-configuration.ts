export type ItemQuantities = Map<number, number>;

export interface SimulationConfig {
  simulationMode: SimulationMode;
  targetMode: SimulationTarget;
  numberOfKills?: number;
  items?: ItemQuantities;
  iterations?: number;
}

export enum SimulationMode {
  Timeline = "timeline",
  Average = "average",
}

export enum SimulationTarget {
  Greenlog = "greenlog",
  NumberOfKills = "numberOfKills",
  NumberOfItems = "numberOfItems",
}
