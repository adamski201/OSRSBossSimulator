import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SimulationAveragePage } from "./simulation-average-page";

describe("Simulation", () => {
  let component: SimulationAveragePage;
  let fixture: ComponentFixture<SimulationAveragePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationAveragePage],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationAveragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
