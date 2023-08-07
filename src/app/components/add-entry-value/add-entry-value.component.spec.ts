import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryValueComponent } from './add-entry-value.component';

describe('AddEntryValueComponent', () => {
  let component: AddEntryValueComponent;
  let fixture: ComponentFixture<AddEntryValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEntryValueComponent]
    });
    fixture = TestBed.createComponent(AddEntryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
