import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-side-panel",
  imports: [],
  templateUrl: "./side-panel.html",
  styleUrl: "./side-panel.scss",
})
export class SidePanel {
  private router = inject(Router);

  protected navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
