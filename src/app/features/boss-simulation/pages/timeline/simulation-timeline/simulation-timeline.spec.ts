import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationTimeline } from './simulation-timeline';

describe('SimulationTimeline', () => {
  let component: SimulationTimeline;
  let fixture: ComponentFixture<SimulationTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationTimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
