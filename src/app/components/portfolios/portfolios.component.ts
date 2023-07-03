import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css']
})
export class PortfoliosComponent {
  // Zeigt an, ob Portfolio hinzugefügt wird
  addActive: Boolean = false;

  // Schaltet Hinzufügen-Ansicht aus/an
  setActive() {
    this.addActive = !this.addActive;
  }


}
