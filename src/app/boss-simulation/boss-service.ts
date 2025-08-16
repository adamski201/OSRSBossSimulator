import { Injectable, signal } from "@angular/core";
import { BOSSES_MAP } from "../data/bosses";
import { Boss } from "./models/boss";

@Injectable({
  providedIn: "root",
})
export class BossService {
  selectedBoss = signal<Boss | undefined>(undefined);

  private allBosses = BOSSES_MAP;

  getBossById(id: string): Boss | undefined {
    return this.allBosses.get(id);
  }

  setBoss(boss: Boss): void {
    this.selectedBoss.set(boss);
  }
}
