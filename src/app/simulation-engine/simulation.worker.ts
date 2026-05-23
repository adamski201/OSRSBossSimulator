/// <reference lib="webworker" />

import { SimulationEngine } from "./simulation-engine";

const engine = new SimulationEngine();

addEventListener("message", ({ data }) => {
  const { boss, totalKills, trials, chunkSize } = data;

  const dropQuantities = new Map<number, number>();
  let completed = 0;

  for (let i = 0; i < trials; i++) {
    const result = engine.runForKills(boss, totalKills);

    result.dropQuantities.forEach((qty, itemId) => {
      const current = dropQuantities.get(itemId) ?? 0;
      dropQuantities.set(itemId, current + qty);
    });

    completed++;

    if (completed % chunkSize === 0) {
      postMessage({
        type: "progress",
        completed,
        dropQuantities,
      });
    }
  }

  postMessage({
    type: "complete",
    completed,
    dropQuantities,
  });
});
