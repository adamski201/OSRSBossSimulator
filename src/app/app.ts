import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "./core/layout/header/header";
import { SidePanel } from "./core/layout/side-panel/side-panel";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Header, SidePanel],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("osrs-boss-simulator");
}
