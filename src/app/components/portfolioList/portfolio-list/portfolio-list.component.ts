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
  // Id des aktuell bearbeiteten Portfolios
  editingPortfolio: number | null = null;
  // Hält die Werte vom aktuell editierten Portfolio
  editingValues = { description: "", typeCode: "" };
  // ngModel Binding für Bearbeitungsinputs
  editModel = [];

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

  // öffnet Portfolio, wenn kein anderer Button geklickt wurde
  clickPortfolio(event: Event, id: number) {
    const target = event.target as HTMLElement;

    // Wurde delete/edit/leave Button geklickt? Dann Modal nicht öffnen (Kann Icon sein oder wrapped DIV)
    if (!target.id?.includes("deleteButton") && !target.parentElement!.id?.includes("deleteButton")
      && !target.id?.includes("editButton") && !target.parentElement!.id?.includes("editButton")
      && !target.id?.includes("leaveButton") && !target.parentElement!.id?.includes("leaveButton")
      && !this.editingPortfolio) {
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
            this.toastDeleteError();
          }
        },
        error: (error) => {
          this.toastDeleteError();
          console.log(`Beim Löschen des Portfolios mit Id ${id} ist ein Fehler aufgetreten`, error);
        }
      })
    }
  }

  // Setzt die Id des aktuell bearbeiteten Portfolios. Wird keine id übergeben, wird der Editmodus verlassen
  editPortfolio(id?: number, index?: number) {
    // Ausführung verzögern, da sonst Prüfung der Domelemente in "clickPortfolio()" auf nicht existierende Elemente stößt
    setTimeout(() => {
      if (id && typeof index === "number") {
        this.editingPortfolio = id === this.editingPortfolio ? null : id;

        // Werte für das aktuell bearbeitete Portfolio setzen 
        this.editingValues.description = this.portfolios[index].description;
        this.editingValues.typeCode = this.portfolios[index].portfolioType?.code!;
      } else {
        // Wenn keine ID übergeben wurde, Modus verlassen
        this.editingPortfolio = null;
      }
    }, 50);
  }

  // Speichert geändertes Portfolio
  savePortfolio(id: number) {
    // Werte des geänderten Portfolios zusammensetzen
    const portfolio: Portfolio = { id: id, description: this.editingValues.description, typeCode: this.editingValues.typeCode }

    // Request absetzen
    this.portfolioService.putPortfolio(portfolio).subscribe({
      next: (response) => {
        if (response.success) {
          this._toastService.success("Das Portfolio wurde erfolgreich geändert!");
          // Editmodus verlassen
          this.editPortfolio();
          // Angezeigte Portfolios aktualisieren
          this.updatePortfolios();
        } else {
          this.toastEditError();
        }
      },
      error: (error) => {
        console.log("Beim Ändern des Portfolios mit id " + id + " ist ein Fehler aufgetreten!", error);
        this.toastEditError();
      }
    });
  }

  toastDeleteError() {
    this._toastService.error("Beim Löschen des Portfolios ist ein Fehler aufgetreten!");
  }

  toastEditError() {
    this._toastService.error("Beim Ändern des Portfolios ist ein Fehler aufgetreten!");
  }




}
