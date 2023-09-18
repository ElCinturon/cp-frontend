import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortfolioEntryComponent } from './add-portfolio-entry.component';

describe('AddPortfolioEntryComponent', () => {
  let component: AddPortfolioEntryComponent;
  let fixture: ComponentFixture<AddPortfolioEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPortfolioEntryComponent]
    });
    fixture = TestBed.createComponent(AddPortfolioEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
