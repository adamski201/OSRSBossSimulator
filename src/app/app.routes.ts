import { Routes } from "@angular/router";
import { BossSelect } from "./components/boss-select/boss-select";
import { SimulationConfigure } from "./components/simulation-configure/simulation-configure";
import { Simulation } from "./components/simulation/simulation";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "bosses",
    pathMatch: "full",
  },
  {
    path: "bosses",
    component: BossSelect,
    pathMatch: "full",
  },
  {
    path: ":boss/configure",
    component: SimulationConfigure,
    pathMatch: "full",
  },
  {
    path: ":boss/simulation",
    component: Simulation,
    pathMatch: "full",
  },
];
