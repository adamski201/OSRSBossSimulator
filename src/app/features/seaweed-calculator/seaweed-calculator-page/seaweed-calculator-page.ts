import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SkillLevelSelector } from "../../../shared/components/stat-lookup-box/skill-level-selector";

@Component({
  selector: "app-seaweed-calculator-page",
  imports: [CommonModule, FormsModule, SkillLevelSelector],
  templateUrl: "./seaweed-calculator-page.html",
  styleUrl: "./seaweed-calculator-page.scss",
})
export class SeaweedCalculatorPage {
}
