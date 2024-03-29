import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PortfolioService } from "src/app/services/portfolio.service";
import { todayAsString } from "src/app/shared/helper/dates";
import { PortfolioEntryValue, PortfolioEntryValueForm } from "src/app/shared/interfaces/PortfolioEntryValue";

@Component({
  selector: "add-entry-value",
  templateUrl: "./add-entry-value.component.html",
  styleUrls: ["./add-entry-value.component.css"]
})
export class AddEntryValueComponent {

  constructor(private portfolioService: PortfolioService) { }
  error: any = {};

  @Input() portfolioId: number | null = null;
  @Input() portfolioEntryId: number | null = null;
  @Output() closeComponent = new EventEmitter<boolean>();
  @Output() valueAdded = new EventEmitter<boolean>();
  successMsg = "";

  addValueForm = new FormGroup<PortfolioEntryValueForm>({
    value: new FormControl("", { nonNullable: true }),
    time: new FormControl("", { nonNullable: true })
  });

  get value() { return this.addValueForm.get("value"); }
  get time() { return this.addValueForm.get("time"); }

  addValue() {
    this.successMsg = "";
    this.error = {};
    if (this.portfolioId && this.portfolioEntryId) {
      const valueForm: any = this.addValueForm.getRawValue();
      const value: PortfolioEntryValue = { time: valueForm.time, value: Number(valueForm.value.replaceAll(".", "").replace(",", ".")) };

      this.portfolioService
        .setPortfolioEntryValue(this.portfolioId, this.portfolioEntryId, value)
        .subscribe({
          next: (response) => {
            if (!response.success) {
              this.error = response.error;
            } else {
              this.valueAdded.emit(true);
              this.successMsg = "Der Wert wurde erfolgreich hinzugefügt!";
            }
          },
          error: (error) => {
            this.error.msg = "Beim Hinzufügen des Portfoliowertes ist ein Fehler aufgetreten!";
            console.error("error", error);
          }
        })
    }


  }
}
