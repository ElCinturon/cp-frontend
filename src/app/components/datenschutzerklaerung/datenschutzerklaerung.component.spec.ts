import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatenschutzerklaerungComponent } from './datenschutzerklaerung.component';

describe('DatenschutzerklaerungComponent', () => {
  let component: DatenschutzerklaerungComponent;
  let fixture: ComponentFixture<DatenschutzerklaerungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatenschutzerklaerungComponent]
    });
    fixture = TestBed.createComponent(DatenschutzerklaerungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
