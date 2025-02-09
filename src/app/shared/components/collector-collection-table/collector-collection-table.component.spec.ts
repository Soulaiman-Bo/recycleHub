import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorCollectionTableComponent } from './collector-collection-table.component';

describe('CollectorCollectionTableComponent', () => {
  let component: CollectorCollectionTableComponent;
  let fixture: ComponentFixture<CollectorCollectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorCollectionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorCollectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
