import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { SimulationConfig } from "../configure/simulation-configuration";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SimulationQueryConfigResolver
  implements Resolve<SimulationConfig>
{
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<SimulationConfig | RedirectCommand> {
    const params = route.queryParams;
    const mode: string = params["mode"];

    switch (mode) {
      case "greenlog":
        return { mode: "greenlog" } as SimulationConfig;

      case "numberOfKills": {
        const kc = Number(params["numberOfKills"]);
        return {
          mode: "numberOfKills",
          numberOfKills: isNaN(kc) || kc <= 0 ? 100 : kc,
        } as SimulationConfig;
      }

      case "numberOfItems": {
        let items = new Map<number, number>();
        try {
          if (params["items"]) {
            const parsed = JSON.parse(params["items"]);
            items = new Map(
              Object.entries(parsed)
                .map(([k, v]): [number, number] => [Number(k), Number(v)])
                .filter(([k, v]) => !isNaN(k) && !isNaN(v) && v > 0),
            );
          }
        } catch {
          return { mode: "greenlog" } as SimulationConfig;
        }
        return { mode: "numberOfItems", items } as SimulationConfig;
      }

      default:
        return { mode: "greenlog" } as SimulationConfig;
    }
  }
}
