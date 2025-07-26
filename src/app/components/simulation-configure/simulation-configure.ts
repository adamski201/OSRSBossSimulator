import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";

@Component({
  selector: "app-simulation-configure",
  imports: [RouterModule],
  templateUrl: "./simulation-configure.html",
  styleUrl: "./simulation-configure.scss",
})
export class SimulationConfigure implements OnInit {
  bossName!: string;

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.bossName = this.route.snapshot.paramMap.get("boss")!;
  }
}
