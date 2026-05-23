import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSelectCard } from './mode-select-card';

describe('ModeSelectCard', () => {
  let component: ModeSelectCard;
  let fixture: ComponentFixture<ModeSelectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeSelectCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeSelectCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
