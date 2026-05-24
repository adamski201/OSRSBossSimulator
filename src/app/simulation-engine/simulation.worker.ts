/// <reference lib="webworker" />

import { Boss } from "../features/boss-simulation/models/boss";
import { SimulationEngine } from "./simulation-engine";

export type SimulationWorkerRequest =
  | {
      type: "kills";
      boss: Boss;
      totalKills: number;
      trials: number;
      chunkSize: number;
    }
  | { type: "greenlog"; boss: Boss; trials: number; chunkSize: number }
  | {
      type: "items";
      boss: Boss;
      itemQuantities: Map<number, number>;
      trials: number;
      chunkSize: number;
    };

export type SimulationWorkerResponse = {
  type: "progress" | "complete";
  completed: number;
  dropQuantities: Map<number, number>;
  accumulatedKillCount: number;
};

const engine = new SimulationEngine();

addEventListener(
  "message",
  ({ data }: MessageEvent<SimulationWorkerRequest>) => {
    const dropQuantities = new Map<number, number>();
    let accumulatedKillCount = 0;
    let completed = 0;

    const simulatorFunc = (data: SimulationWorkerRequest) => {
      switch (data.type) {
        case "kills":
          return engine.runForKills(data.boss, data.totalKills);
        case "greenlog":
          return engine.runUntilGreenlog(data.boss);
        case "items":
          return engine.runUntilItems(data.boss, data.itemQuantities);
      }
    };

    const { trials, chunkSize } = data;

    for (let i = 0; i < trials; i++) {
      const result = simulatorFunc(data);

      result.dropQuantities.forEach((qty, itemId) => {
        const current = dropQuantities.get(itemId) ?? 0;
        dropQuantities.set(itemId, current + qty);
      });

      accumulatedKillCount += result.killCount;

      completed++;

      if (completed % chunkSize === 0) {
        postMessage({
          type: "progress",
          completed,
          dropQuantities,
          accumulatedKillCount,
        });
      }
    }

    postMessage({
      type: "complete",
      completed,
      dropQuantities,
      accumulatedKillCount,
    });
  },
);
