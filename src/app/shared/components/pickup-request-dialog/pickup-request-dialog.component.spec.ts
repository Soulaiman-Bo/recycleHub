import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupRequestDialogComponent } from './pickup-request-dialog.component';

describe('PickupRequestDialogComponent', () => {
  let component: PickupRequestDialogComponent;
  let fixture: ComponentFixture<PickupRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupRequestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
