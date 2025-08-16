import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossSelect } from './boss-select';

describe('BossSelect', () => {
  let component: BossSelect;
  let fixture: ComponentFixture<BossSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BossSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BossSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
