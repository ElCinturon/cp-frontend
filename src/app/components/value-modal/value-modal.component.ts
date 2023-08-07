import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioEntry } from "src/app/shared/interfaces/PortfolioEntry";

@Component({
  selector: "value-modal",
  templateUrl: "./value-modal.component.html",
  styleUrls: ["./value-modal.component.css"]
})
export class ValueModalComponent implements OnChanges {

  constructor(private portfolioService: PortfolioService) { }

  @Input() portfolioId: number | null = null;
  @Input() entryId: number | null = null;
  entry: PortfolioEntry | null = null;
  addValueActive = false;
  error = {};

  ngOnChanges(changes: SimpleChanges): void {
    // Sorgt immer für den aktuell aufgerufenen Eintrag
    if (changes["entryId"] || changes["portfolioId"]) {
      this.getEntry();
    }
  }

  // Ruft anhand der EntryId und PortfolioId den korrekten Entry ab
  getEntry() {
    if (this.portfolioId != null && this.entryId != null) {
      this.portfolioService.getPortfolioEntry(this.portfolioId, this.entryId).subscribe({
        next: (response) => {
          this.entry = response;
          console.log("response", response);
        },
        error: (error) => {
          this.error = "Beim Abruf des Eintrages ist ein Fehler aufgetreten!"

          error.log("Beim Abruf des Eintrages ist ein Fehler aufgetreten: ", error);
        }
      })

    }
  }

  addValue() {
    this.addValueActive = !this.addValueActive;
  }

}
