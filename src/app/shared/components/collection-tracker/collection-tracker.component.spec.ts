import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionTrackerComponent } from './collection-tracker.component';

describe('CollectionTrackerComponent', () => {
  let component: CollectionTrackerComponent;
  let fixture: ComponentFixture<CollectionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
