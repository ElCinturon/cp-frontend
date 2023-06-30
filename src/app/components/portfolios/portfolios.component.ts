import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { PortfolioType } from 'src/app/shared/interfaces/PortfolioType';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css']
})
export class PortfoliosComponent {
  constructor(private portfolioService: PortfolioService) { }
  typeErrorMsg: string = "";
  // Zeigt an, ob Portfolio hinzugefügt wird
  addActive: Boolean = false;
  // Enthält alle Portfoliotypen
  portfolioTypes: PortfolioType[] = [];


  addPortfolioForm = new FormGroup({
    description: new FormControl(""),
    type: new FormControl("")
  });

  get description() { return this.addPortfolioForm.get("description"); }

  // Schaltet Hinzufügen-Ansicht aus/an
  setActive() {
    this.addActive = !this.addActive;

    // Ruft Portfoliotypen ab
    // Todo: Ist caching möglich, nach dem Componente geschlossen wird?
    if (this.addActive) {
      this.portfolioService.getAllPortfolioTypes().subscribe({
        next: (response) => {
          this.portfolioTypes = response;
        }, error: (error) => {
          this.typeErrorMsg = "Beim Abruf der Typen ist ein Fehler aufgetreten!";
          console.error("Fehler beim Abruf der Portfoliotypen: ", error)
        }
      });
    }

  }

  addPortfolio() {

  }

}
