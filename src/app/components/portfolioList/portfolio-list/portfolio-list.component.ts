import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "angular-toastify";
import { PortfolioService } from "src/app/services/portfolio.service";
import { Portfolio } from "src/app/shared/interfaces/Portfolio";


@Component({
  selector: "portfolio-list",
  templateUrl: "./portfolio-list.component.html",
  styleUrls: ["./portfolio-list.component.css"]
})
export class PortfolioListComponent implements OnInit {

  constructor(private portfolioService: PortfolioService, private router: Router, private _toastService: ToastService) { }

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

  clickPortfolio(event: Event, id: number) {
    const target = event.target as HTMLElement;

    // Wurde delete Button geklickt? Dann Modal nicht öffnen (Kann Icon sein oder wrapped DIV)
    if (!target.id.includes("deleteButton") && !target.parentElement!.id.includes("deleteButton")) {
      this.router.navigate(["/portfolios", id]);
    }
  }

  deletePortfolio(id: number) {
    if (id && confirm("Möchten Sie das Portfolio wirklich entfernen?")) {
      this.portfolioService.deletePortfolio(id).subscribe({
        next: (response) => {
          if (response.success) {
            // Portfolios aktualisieren
            this.updatePortfolios();
            // Bestätigungsmessage anzeigen
            this._toastService.success("Das Portfolio wurde erfolgreich gelöscht!");
          } else {
            this.toastError();
          }
        },
        error: (error) => {
          this.toastError();
          console.log(`Beim Löschen des Portfolios mit Id ${id} ist ein Fehler aufgetreten`, error);
        }
      })
    }
  }

  toastError() {
    this._toastService.error("Beim Löschen des Portfolios ist ein Fehler aufgetreten!");
  }




}
