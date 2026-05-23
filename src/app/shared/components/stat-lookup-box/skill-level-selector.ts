import { JsonPipe } from "@angular/common";
import { Component, input, output, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { LEVEL_XP, LEVELS_MAP } from "../../../data/levels";

interface FormData {
  mode: "level" | "xp";
  xp: string;
  level: string;
}

@Component({
  selector: "app-skill-level-selector",
  imports: [FormField, JsonPipe],
  templateUrl: "./skill-level-selector.html",
  styleUrl: "./skill-level-selector.scss",
})
export class SkillLevelSelector {
  skill = input.required<string>();
  result = output<{ level: number; xp: number } | null>();

  formModel = signal<FormData>({
    mode: "level",
    xp: "",
    level: "",
  });

  form = form(this.formModel);

  onXpChanged(event: Event) {
    const xpStr = (event.target as HTMLInputElement).value;
    const xp = Number(xpStr);
    const level = this.xpToLevel(xp);

    this.form.level().value.set(level.toString());
  }

  onLevelChanged(event: Event) {
    const levelStr = (event.target as HTMLInputElement).value;
    const level = Number(levelStr);
    const xp = this.levelToXp(level);

    this.form.xp().value.set(xp.toString());
  }

  levelToXp(level: number): number {
    return LEVELS_MAP.get(level) ?? 0;
  }

  xpToLevel(xp: number): number {
    for (let i = 0; i < 99; i++) {
      const levelXp = LEVEL_XP[i];
      if (xp < levelXp) {
        return i;
      }
    }

    return 0;
  }
}
