import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowBirthdayComponent } from './dialog-show-birthday.component';

describe('DialogShowBirthdayComponent', () => {
  let component: DialogShowBirthdayComponent;
  let fixture: ComponentFixture<DialogShowBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
