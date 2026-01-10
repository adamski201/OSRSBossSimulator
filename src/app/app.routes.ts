import { Routes } from "@angular/router";
import { ConfigurationPage } from "./boss-simulation/pages/configure/configuration-page";
import { BossSelect } from "./boss-simulation/pages/boss-selection/boss-select";
import { SimulationPage } from "./boss-simulation/pages/simulation/simulation-page";
import { validateBossGuard } from "./boss-simulation/route-guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "select",
    pathMatch: "full",
  },
  {
    path: "select",
    component: BossSelect,
    pathMatch: "full",
  },
  {
    path: ":boss/configure",
    component: ConfigurationPage,
    canActivate: [validateBossGuard],
    pathMatch: "full",
  },
  {
    path: ":boss/simulation",
    component: SimulationPage,
    canActivate: [validateBossGuard],
    pathMatch: "full",
  },
];
