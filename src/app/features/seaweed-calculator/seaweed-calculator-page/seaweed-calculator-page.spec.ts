import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaweedCalculatorPage } from './seaweed-calculator-page';

describe('SeaweedCalculatorPage', () => {
  let component: SeaweedCalculatorPage;
  let fixture: ComponentFixture<SeaweedCalculatorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeaweedCalculatorPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaweedCalculatorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
