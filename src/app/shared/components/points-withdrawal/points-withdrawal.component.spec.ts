import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsWithdrawalComponent } from './points-withdrawal.component';

describe('PointsWithdrawalComponent', () => {
  let component: PointsWithdrawalComponent;
  let fixture: ComponentFixture<PointsWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsWithdrawalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
