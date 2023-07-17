import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Portfolio } from 'src/app/shared/interfaces/Portfolio';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

  portfolio?: Portfolio | null = null;
  error: any = null;

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService) { }

  ngOnInit() {
    // übergebene Id auslesen
    const PortfolioId = Number(this.route.snapshot.paramMap.get('id'));

    // Portfolio anhand von Id abrufen
    this.portfolioService.getPortfolio(PortfolioId).subscribe({
      next: (response) => {
        if (!response?.success) {
          this.error = response?.error;
        } else {
          this.portfolio = response?.data;
        }
      },
      error: (error) => {
        console.error(`Bei Abruf des Portfolios mit Id ${PortfolioId} ist ein Fehler aufgetreten`, error);
        this.error = error;
      }
    })

  }

}
