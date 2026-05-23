import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

const SKILL_NAMES = [
  "Overall",
  "Attack",
  "Defence",
  "Strength",
  "Constitution",
  "Ranged",
  "Prayer",
  "Magic",
  "Cooking",
  "Woodcutting",
  "Fletching",
  "Fishing",
  "Firemaking",
  "Crafting",
  "Smithing",
  "Mining",
  "Herblore",
  "Agility",
  "Thieving",
  "Slayer",
  "Farming",
  "Runecrafting",
  "Hunter",
  "Construction",
  "Summoning",
];

export interface SkillDto {
  id: number;
  name: string;
  rank: number;
  level: number;
  xp: number;
}

export interface PlayerMetricsDto {
  name: string;
  skills: SkillDto[];
  activities: ActivityDto[];
}

export interface ActivityDto {
  id: number;
  name: string;
  rank: number;
  score: number;
}

@Injectable({
  providedIn: "root",
})
export class RsApiService {
  private apiUrl =
    "https://secure.runescape.com/m=hiscore_oldschool/index_lite.json";

  constructor(private http: HttpClient) {}

  getUserStatsForSkill(
    username: string,
    skillName: string,
  ): Observable<{ level: number; xp: number } | null> {
    return this.getMetricsForUser(username).pipe(
      map((metrics) => {
        const skill = metrics.skills.find((s) => s.name === skillName);
        return skill ? { level: skill.level, xp: skill.xp } : null;
      }),
    );
  }

  private getMetricsForUser(username: string): Observable<PlayerMetricsDto> {
    return this.http.get<PlayerMetricsDto>(
      `${this.apiUrl}?player=${encodeURIComponent(username)}`,
    );
  }
}
