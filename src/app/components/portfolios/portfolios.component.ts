import { Component } from "@angular/core";

@Component({
  selector: "app-portfolios",
  templateUrl: "./portfolios.component.html",
  styleUrls: ["./portfolios.component.css"]
})
export class PortfoliosComponent {
  // Zeigt an, ob Portfolio hinzugefügt wird
  addActive = false;
  // Ist in den Childcomponents ein Error aufgetreten?
  error = false;

  // Schaltet Hinzufügen-Ansicht aus/an
  setActive() {
    this.addActive = !this.addActive;
  }


}
