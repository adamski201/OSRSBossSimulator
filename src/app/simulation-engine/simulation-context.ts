import { Drop } from "./models/drop";

export class SimulationContext {
  kc: number = 0;
  drops: Drop[] = [];
  greenLogKc?: number = undefined;
  dropQuantities: Map<number, number> = new Map();
  uniqueFirstObtainedAt: Map<number, number> = new Map();
  numberOfUniqueDrops: number;

  constructor(numberOfUniqueDrops: number) {
    this.numberOfUniqueDrops = numberOfUniqueDrops;
  }

  addDrop(drop: Drop): void {
    this.drops.push(drop);
    this.updateDropQuantities(drop.id);
    this.updateUniqueFirstObtainedAt(drop.id);
    this.updateGreenLogKc();
  }

  private updateGreenLogKc() {
    if (
      !this.greenLogKc &&
      this.uniqueFirstObtainedAt.size === this.numberOfUniqueDrops
    ) {
      this.greenLogKc = this.kc;
    }
  }

  private updateUniqueFirstObtainedAt(id: number) {
    if (!this.uniqueFirstObtainedAt.has(id)) {
      this.uniqueFirstObtainedAt.set(id, this.kc);
    }
  }

  private updateDropQuantities(id: number) {
    this.dropQuantities.set(id, (this.dropQuantities.get(id) ?? 0) + 1);
  }
}
