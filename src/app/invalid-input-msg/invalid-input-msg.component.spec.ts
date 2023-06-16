import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidInputMsgComponent } from './invalid-input-msg.component';

describe('InvalidInputMsgComponent', () => {
  let component: InvalidInputMsgComponent;
  let fixture: ComponentFixture<InvalidInputMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidInputMsgComponent]
    });
    fixture = TestBed.createComponent(InvalidInputMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
