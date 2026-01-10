import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SimulationTimelinePage } from "./simulation-timeline-page";

describe("Simulation", () => {
  let component: SimulationTimelinePage;
  let fixture: ComponentFixture<SimulationTimelinePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationTimelinePage],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationTimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
