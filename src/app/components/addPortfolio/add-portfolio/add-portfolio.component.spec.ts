import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortfolioComponent } from './add-portfolio.component';

describe('AddPortfolioComponent', () => {
  let component: AddPortfolioComponent;
  let fixture: ComponentFixture<AddPortfolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPortfolioComponent]
    });
    fixture = TestBed.createComponent(AddPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
