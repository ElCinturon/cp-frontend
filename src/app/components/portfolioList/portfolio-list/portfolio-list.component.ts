import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PortfolioService } from "src/app/services/portfolio.service";
import { Portfolio } from "src/app/shared/interfaces/Portfolio";


@Component({
  selector: "portfolio-list",
  templateUrl: "./portfolio-list.component.html",
  styleUrls: ["./portfolio-list.component.css"]
})
export class PortfolioListComponent implements OnInit {

  constructor(private portfolioService: PortfolioService) { }

  // Signalisiert ob ein error aufgetreten ist
  @Output() errorOcurred = new EventEmitter<boolean>();
  portfolios: Portfolio[] = [];
  portfoliosSet = false;
  error: any = {};

  ngOnInit() {
    this.updatePortfolios();
  }

  // Ruft die aktuellen Porfolios des Nutzers ab
  updatePortfolios() {
    this.portfolioService.getPortfolios().subscribe({
      next: (response => {
        this.portfolios = response;
        this.portfoliosSet = true;
      }),
      error: (error => {
        this.error.msg = "Beim Abruf der Portfolios ist ein Problem aufgetreten!";
        this.errorOcurred.emit(true);
        console.error(error);
      })
    })
  }


}
