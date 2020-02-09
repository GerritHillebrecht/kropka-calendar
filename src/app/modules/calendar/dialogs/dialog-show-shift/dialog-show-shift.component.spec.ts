import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowShiftComponent } from './dialog-show-shift.component';

describe('DialogShowShiftComponent', () => {
  let component: DialogShowShiftComponent;
  let fixture: ComponentFixture<DialogShowShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
