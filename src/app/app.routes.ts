import { Routes } from "@angular/router";
import { ConfigurationPage } from "./boss-simulation/pages/configure/configuration-page";
import { BossSelect } from "./boss-simulation/pages/boss-selection/boss-select";
import { SimulationTimelinePage } from "./boss-simulation/pages/timeline/simulation-timeline-page";
import { validateBossGuard } from "./boss-simulation/route-guard";
import { SimulationAveragePage } from "./boss-simulation/pages/average/simulation-average-page";

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
    path: ":boss/simulation/timeline",
    component: SimulationTimelinePage,
    canActivate: [validateBossGuard],
    pathMatch: "full",
  },
  {
    path: ":boss/simulation/average",
    component: SimulationAveragePage,
    canActivate: [validateBossGuard],
    pathMatch: "full",
  },
];
