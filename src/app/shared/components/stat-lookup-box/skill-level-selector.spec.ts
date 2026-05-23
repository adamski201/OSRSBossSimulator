import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SkillLevelSelector } from "./skill-level-selector";

describe("StatLookupBox", () => {
  let component: SkillLevelSelector;
  let fixture: ComponentFixture<SkillLevelSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillLevelSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillLevelSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
