import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ToastService } from "angular-toastify";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioEntry } from "src/app/shared/interfaces/PortfolioEntry";

@Component({
  selector: "value-modal",
  templateUrl: "./value-modal.component.html",
  styleUrls: ["./value-modal.component.css"]
})
export class ValueModalComponent implements OnChanges {

  constructor(private portfolioService: PortfolioService, private _toastService: ToastService) { }

  @Input() portfolioId: number | null = null;
  @Input() entryId: number | null = null;
  entry: PortfolioEntry | null = null;
  addValueActive = false;
  error = { msg: "" };

  ngOnChanges(changes: SimpleChanges): void {
    // Sorgt immer für den aktuell aufgerufenen Eintrag
    if (changes["entryId"] || changes["portfolioId"]) {
      this.error = { msg: "" };
      this.getEntry();
    }
  }

  // Ruft anhand der EntryId und PortfolioId den korrekten Entry ab
  getEntry() {
    this.error.msg = "";
    if (this.portfolioId != null && this.entryId != null) {
      this.portfolioService.getPortfolioEntry(this.portfolioId, this.entryId).subscribe({
        next: (response) => {
          this.entry = response;
        },
        error: (error) => {
          this.error.msg = "Beim Abruf des Eintrages ist ein Fehler aufgetreten!"
          error.log("Beim Abruf des Eintrages ist ein Fehler aufgetreten: ", error);
        }
      })

    }
  }

  addValue() {
    this.addValueActive = !this.addValueActive;
  }

  // Löscht entryvalue
  deleteValue(id: number) {
    this.error.msg = "";
    if (this.portfolioId != null && this.entryId != null) {
      this.portfolioService.deletePortfolioEntryValue(this.portfolioId, this.entryId, id).subscribe({
        next: (response) => {
          if (response.success) {
            this._toastService.success("Eintrag erfolgreich entfernt!");
            this.getEntry();
          } else {
            this.error = response.error;
          }
        },
        error: (error) => {
          const errorTxt = "Beim Löschen des Eintrags ist ein Fehler aufgetreten!"
          this.error.msg = errorTxt;
          console.error(errorTxt, error);
        }
      })
    }
  }

}
