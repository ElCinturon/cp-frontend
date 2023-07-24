import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { formatDbDateTime } from 'src/app/shared/helper/dates';
import { Portfolio } from 'src/app/shared/interfaces/Portfolio';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

  portfolio?: Portfolio | null = null;
  error: any = null;
  addEntryActive = false;
  portfolioId: number | null = null;
  @Output() closeComponent = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService) { }

  get creationDateTime() { return this.portfolio?.createdAt ? formatDbDateTime(this.portfolio?.createdAt) : "" }

  ngOnInit() {
    // übergebene Id auslesen
    this.portfolioId = Number(this.route.snapshot.paramMap.get('id'));

    // Portfolio anhand von Id abrufen
    this.portfolioService.getPortfolio(this.portfolioId).subscribe({
      next: (response) => {
        if (!response?.success) {
          this.error = response?.error;
        } else {
          this.portfolio = response?.data;
        }
      },
      error: (error) => {
        console.error(`Bei Abruf des Portfolios mit Id ${this.portfolioId} ist ein Fehler aufgetreten`, error);
        this.error = error;
      }
    })

  }

  /**
   * Schaltet Modus zum Hinzufügen von Eintrag ein/aus
   */
  activateAddEntry() {
    this.addEntryActive = !this.addEntryActive;
  }

}
