import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PortfolioService } from "src/app/services/portfolio.service";
import { formatDbDateTime } from "src/app/shared/helper/dates";
import { Portfolio } from "src/app/shared/interfaces/Portfolio";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"]
})
export class PortfolioComponent implements OnInit {

  portfolio?: Portfolio | null = null;
  error: any = {};
  addEntryActive = false;
  portfolioId: number | null = null;
  portfolioSet = false;
  @Output() closeComponent = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService) { }

  get creationDateTime() { return this.portfolio?.createdAt ? formatDbDateTime(this.portfolio?.createdAt) : "" }

  ngOnInit() {
    // übergebene Id auslesen und Portfolio abrufen
    this.portfolioId = Number(this.route.snapshot.paramMap.get("id"));
    this.getPortfolio();
  }

  getPortfolio() {
    // Portfolio anhand von Id abrufen
    this.portfolioService.getPortfolio(this.portfolioId!).subscribe({
      next: (response) => {
        if (!response?.success) {
          this.error = response?.error;
        } else {
          this.portfolio = response?.data;
          this.portfolioSet = true;
        }
      },
      error: (error) => {
        this.error.msg = "Bei Abruf des Portfolios ist ein Fehler aufgetreten";
        console.error(`Bei Abruf des Portfolios mit Id ${this.portfolioId} ist ein Fehler aufgetreten`, error);
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
