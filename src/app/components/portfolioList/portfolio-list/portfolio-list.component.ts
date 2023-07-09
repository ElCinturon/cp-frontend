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
  portfoliosExist: Boolean = true;

  ngOnInit() {
    this.updatePortfolios();
  }

  // Ruft die aktuellen Porfolios des Nutzers ab
  updatePortfolios() {
    this.portfolioService.getPortfolios().subscribe({
      next: (response => {
        this.portfolios = response;
        if (this.portfolios.length > 0) {
          this.portfoliosExist = true;
        } else {
          this.portfoliosExist = false;
        }

      }),
      error: (error => {
        console.error(error);
      })
    })
  }


}
