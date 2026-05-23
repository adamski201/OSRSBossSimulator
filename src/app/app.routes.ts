import { Routes } from "@angular/router";
import { ConfigurationPage } from "./features/boss-simulation/pages/configure/configuration-page";
import { BossSelect } from "./features/boss-simulation/pages/boss-selection/boss-select";
import { SimulationTimelinePage } from "./features/boss-simulation/pages/timeline/simulation-timeline-page";
import { validateBossGuard } from "./features/boss-simulation/route-guard";
import { SimulationAveragePage } from "./features/boss-simulation/pages/average/simulation-average-page";
import { SeaweedCalculatorPage } from "./features/seaweed-calculator/seaweed-calculator-page/seaweed-calculator-page";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "",
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
  {
    path: "seaweed-calculator",
    component: SeaweedCalculatorPage,
    pathMatch: "full",
  },
];
