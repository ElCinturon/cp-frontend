import { Component, Input, OnInit, } from "@angular/core";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioEntry } from "src/app/shared/interfaces/PortfolioEntry";

@Component({
  selector: "portfolio-entry-list",
  templateUrl: "./portfolio-entry-list.component.html",
  styleUrls: ["./portfolio-entry-list.component.css"]
})
export class PortfolioEntryListComponent implements OnInit {

  constructor(private portfolioService: PortfolioService) { }

  @Input() portfolioId: number | null = null;
  portfolioEntries: PortfolioEntry[] = [];
  portfolioEntriesSet = false;
  entryId: number | null = null;
  showModal = false;
  error: any = {};

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
        console.error("Beim Abruf der Portfolioeinträge zu Portoflio mit id " + this.portfolioId + " ist ein Fehler aufgetreten", error);
        this.error.msg = "Bei der Anzeige der Portfolioeinträge ist ein Fehler aufgetreten!";
      })
    })
  }

}
