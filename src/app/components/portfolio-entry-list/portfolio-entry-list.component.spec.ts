import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioEntryListComponent } from './portfolio-entry-list.component';

describe('PortfolioEntryListComponent', () => {
  let component: PortfolioEntryListComponent;
  let fixture: ComponentFixture<PortfolioEntryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioEntryListComponent]
    });
    fixture = TestBed.createComponent(PortfolioEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
