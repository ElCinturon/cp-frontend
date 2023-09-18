import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalInputComponent } from './decimal-input.component';

describe('DecimalInputComponent', () => {
  let component: DecimalInputComponent;
  let fixture: ComponentFixture<DecimalInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecimalInputComponent]
    });
    fixture = TestBed.createComponent(DecimalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
