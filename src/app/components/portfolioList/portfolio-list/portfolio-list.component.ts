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



  ngOnInit() {

    this.portfolioService.getPortfolios().subscribe({
      next: (response => {
        this.portfolios = response;
      }),
      error: (error => {
        console.error(error);
      })
    })



  }

}
