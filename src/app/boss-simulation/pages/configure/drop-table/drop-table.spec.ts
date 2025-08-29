import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropTable } from './drop-table';

describe('DropTable', () => {
  let component: DropTable;
  let fixture: ComponentFixture<DropTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
