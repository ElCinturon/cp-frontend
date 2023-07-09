import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Portfolio } from 'src/app/shared/interfaces/Portfolio';


@Component({
  selector: 'portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent {

  constructor(private portfolioService: PortfolioService) { };

  portfolios: Portfolio[] = [];
  portfoliosSet: Boolean = false;

  ngOnInit() {
    this.updatePortfolios();
  }

  // Ruft die aktuellen Porfolios des Nutzers ab
  updatePortfolios() {
    this.portfolioService.getPortfolios().subscribe({
      next: (response => {
        this.portfolios = response;
        this.portfoliosSet = true;
      }),
      error: (error => {
        console.error(error);
      })
    })
  }


}
