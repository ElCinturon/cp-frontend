import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioTypeSelectComponent } from './portfolio-type-select.component';

describe('PortfolioTypeSelectComponent', () => {
  let component: PortfolioTypeSelectComponent;
  let fixture: ComponentFixture<PortfolioTypeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioTypeSelectComponent]
    });
    fixture = TestBed.createComponent(PortfolioTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
