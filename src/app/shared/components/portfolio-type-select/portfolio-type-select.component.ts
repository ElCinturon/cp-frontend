import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioType } from "../../interfaces/PortfolioType";

@Component({
  selector: "portfolio-type-select",
  templateUrl: "./portfolio-type-select.component.html",
  styleUrls: ["./portfolio-type-select.component.css"]
})
export class PortfolioTypeSelectComponent implements OnInit {

  constructor(private portfolioService: PortfolioService) { }
  portfolioTypes: PortfolioType[] = [];
  error = { typeCode: "" };
  @Input() type!: PortfolioType | null;
  @Output() typeCodeChange = new EventEmitter<string>();
  selectValue = "";

  ngOnInit() {
    this.setPortfolioTypes();
  }

  change() {
    console.log("change", this.selectValue);
    this.typeCodeChange.emit(this.selectValue);
  }

  async setPortfolioTypes() {
    this.portfolioService.getAllPortfolioTypes().subscribe({
      next: (response) => {
        this.portfolioTypes = response;

        // Sobald Werte abgerufen wurden, den korrekten Typ setzen
        setTimeout(() => this.selectValue = this.type!.code!, 5);
      }, error: (error) => {
        this.error = { ...this.error, ...{ "typeCode": "Beim Abruf der Typen ist ein Fehler aufgetreten!" } };
        console.log("error", this.error);
        console.error("Fehler beim Abruf der Portfoliotypen: ", error);
      }
    });
  }

}
