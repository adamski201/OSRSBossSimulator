import { Routes } from "@angular/router";
import { BossSelect } from "./components/boss-select/boss-select";
import { SimulationConfigure } from "./components/configuration-page/simulation-configure";
import { SimulationPage } from "./components/simulation-page/simulation-page";

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
    component: SimulationPage,
    pathMatch: "full",
  },
];
