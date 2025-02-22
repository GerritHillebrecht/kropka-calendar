import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCoreComponent } from './calendar-core.component';

describe('CalendarCoreComponent', () => {
  let component: CalendarCoreComponent;
  let fixture: ComponentFixture<CalendarCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
