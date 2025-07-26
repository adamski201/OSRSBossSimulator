import { Drop } from "./drop";

export interface SimulationResult {
  bossId: string;
  killCount: number;
  drops: Drop[];
  isGreenLogComplete: boolean;
  greenLogKillCount?: number;
  dropQuantities: Map<number, number>;
  uniqueFirstObtainedAt: Map<number, number>;
}
