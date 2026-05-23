import { Drop } from "./drop";

export interface SimulationResult {
  killCount: number;
  drops: Drop[];
  isGreenLogComplete: boolean;
  greenLogKillCount?: number;
  dropQuantities: Map<number, number>;
  uniqueFirstObtainedAt: Map<number, number>;
}

export interface AveragedSimulationResult {
  killCount: number;
  dropQuantities: Map<number, number>;
  progress: number;
}
