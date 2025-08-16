import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BossService } from "./boss-service";

export const validateBossGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const bossService = inject(BossService);

  const id = route.paramMap.get("boss");

  if (!id) {
    return router.createUrlTree(["/select"]);
  }

  if (bossService.selectedBoss()?.id === id) {
    return true;
  }

  const boss = bossService.getBossById(id);

  if (!boss) {
    return router.createUrlTree(["/select"]);
  }

  bossService.setBoss(boss);
  return true;
};
