import { Component, Input } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { PortfolioEntry } from 'src/app/shared/interfaces/PortfolioEntry';

@Component({
  selector: 'portfolio-entry-list',
  templateUrl: './portfolio-entry-list.component.html',
  styleUrls: ['./portfolio-entry-list.component.css']
})
export class PortfolioEntryListComponent {

  constructor(private portfolioService: PortfolioService) { };

  @Input() portfolioId: number | null = null;
  portfolioEntries: PortfolioEntry[] = [];
  portfolioEntriesSet: Boolean = false;
  error: any = "";

  ngOnInit() {
    this.updatePortfolioEntries();
  }

  // Ruft die aktuellen Einträge des aktuellen Portfolios ab
  updatePortfolioEntries() {
    this.portfolioService.getPortfolioEntries(this.portfolioId!).subscribe({
      next: (response => {
        this.portfolioEntries = response;
        this.portfolioEntriesSet = true;
      }),
      error: (error => {
        console.error(error);
        this.error = error.msg;
      })
    })
  }

}
