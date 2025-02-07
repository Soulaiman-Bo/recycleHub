import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteTestComponent } from './waste-test.component';

describe('WasteTestComponent', () => {
  let component: WasteTestComponent;
  let fixture: ComponentFixture<WasteTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
