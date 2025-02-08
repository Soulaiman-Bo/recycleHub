import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailsDialogComponent } from './collection-details-dialog.component';

describe('CollectionDetailsDialogComponent', () => {
  let component: CollectionDetailsDialogComponent;
  let fixture: ComponentFixture<CollectionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
