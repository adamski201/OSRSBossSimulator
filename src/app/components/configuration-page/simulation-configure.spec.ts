import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationConfigure } from './simulation-configure';

describe('SimulationConfigure', () => {
  let component: SimulationConfigure;
  let fixture: ComponentFixture<SimulationConfigure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationConfigure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationConfigure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
