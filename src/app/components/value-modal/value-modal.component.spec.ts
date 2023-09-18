import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueModalComponent } from './value-modal.component';

describe('ValueModalComponent', () => {
  let component: ValueModalComponent;
  let fixture: ComponentFixture<ValueModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueModalComponent]
    });
    fixture = TestBed.createComponent(ValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
