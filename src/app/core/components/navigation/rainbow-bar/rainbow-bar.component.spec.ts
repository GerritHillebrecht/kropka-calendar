import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RainbowBarComponent } from './rainbow-bar.component';

describe('RainbowBarComponent', () => {
  let component: RainbowBarComponent;
  let fixture: ComponentFixture<RainbowBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RainbowBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RainbowBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
