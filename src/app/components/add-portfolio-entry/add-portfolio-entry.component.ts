import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { PortfolioEntryForm } from 'src/app/shared/interfaces/PortfolioEntry';

@Component({
  selector: 'app-add-portfolio-entry',
  templateUrl: './add-portfolio-entry.component.html',
  styleUrls: ['./add-portfolio-entry.component.css']
})
export class AddPortfolioEntryComponent {
  constructor(private portfolioService: PortfolioService) { }

  error: any = null;
  successMsg: string = "";
  @Output() portfolioEntryAdded = new EventEmitter<boolean>();
  @Output() closeComponent = new EventEmitter<boolean>();


  addPortfolioEntryForm = new FormGroup<PortfolioEntryForm>({
    description: new FormControl("", { nonNullable: true }),
    value: new FormControl(0, { nonNullable: true }),
    datetime: new FormControl(new Date(Date.now()), { nonNullable: true })
  });

  get description() { return this.addPortfolioEntryForm.get("description"); }
  get value() { return this.addPortfolioEntryForm.get("value"); }
  get datetime() { return this.addPortfolioEntryForm.get("datetime"); }


  // Speichert den eingegebene Portfolioentry
  addPortfolioEntry() {
    this.error = null;
    this.successMsg = "";

    this.portfolioService.postPortfolioEntry(this.addPortfolioEntryForm.getRawValue()).subscribe({
      next: (response) => {
        if (!response.success) {
          this.error = response.error;
        } else {
          // Aktualisierung der Portfolioliste emiten
          this.portfolioEntryAdded.emit(true);
          this.successMsg = "Der Eintrag wurde erfolgreich angelegt!"
        }
      },
      error: (error) => {
        this.error.msg = "Es ist ein Fehler bei der Anlage des Eintrags aufgetreten!"
        console.error("error", error);
      }
    })

  }
}
