import { TestBed } from "@angular/core/testing";

import { BOSSES } from "../../../data/bosses";
import { SimulationService } from "./simulation-service";

describe("Simulation", () => {
  let service: SimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
