import { Routes } from "@angular/router";
import { BossSelect } from "./boss-select/boss-select";

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
];
