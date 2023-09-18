import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioForm } from "src/app/shared/interfaces/Portfolio";
import { PortfolioType } from "src/app/shared/interfaces/PortfolioType";

@Component({
  selector: "add-portfolio",
  templateUrl: "./add-portfolio.component.html",
  styleUrls: ["./add-portfolio.component.css"]
})
export class AddPortfolioComponent implements OnInit {
  constructor(private portfolioService: PortfolioService) { }
  error: any = {};
  successMsg = "";
  @Output() portfolioAdded = new EventEmitter<boolean>();
  @Output() closeComponent = new EventEmitter<boolean>();

  // Enthält alle Portfoliotypen
  portfolioTypes: PortfolioType[] = [];

  addPortfolioForm = new FormGroup<PortfolioForm>({
    description: new FormControl("", { nonNullable: true }),
    typeCode: new FormControl("", { nonNullable: true })
  });

  get description() { return this.addPortfolioForm.get("description"); }
  get typeCode() { return this.addPortfolioForm.get("typeCode"); }

  ngOnInit() {
    this.setPortfolioTypes();
  }

  // Ruft Portfoliotypen ab
  setPortfolioTypes() {
    this.portfolioService.getAllPortfolioTypes().subscribe({
      next: (response) => {
        this.portfolioTypes = response;
        this.portfolioTypes.unshift({ description: "Portfoliotyp wählen", code: "" });
      }, error: (error) => {
        this.error = { ...this.error, ...{ "typeCode": "Beim Abruf der Typen ist ein Fehler aufgetreten!" } };
        console.log("error", this.error);
        console.error("Fehler beim Abruf der Portfoliotypen: ", error);
      }
    });
  }

  // Speichert das eingegebene Portfolio
  addPortfolio() {
    this.error = {};
    this.successMsg = "";

    this.portfolioService.postPortfolio(this.addPortfolioForm.getRawValue()).subscribe({
      next: (response) => {
        if (!response.success) {
          this.error = response.error;
        } else {
          // Aktualisierung der Portfolioliste emiten
          this.portfolioAdded.emit(true);
          this.successMsg = "Das Portfolio wurde erfolgreich angelegt!"
        }
      },
      error: (error) => {
        this.error.msg = "Es ist ein Fehler bei der Anlage des Portfolios aufgetreten!"
        console.error("error", error);
      }
    })

  }

}
