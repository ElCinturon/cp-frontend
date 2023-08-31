import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioEntry, PortfolioEntryForm } from "src/app/shared/interfaces/PortfolioEntry";
import { PortfolioEntryValue } from "src/app/shared/interfaces/PortfolioEntryValue";

@Component({
  selector: "add-portfolio-entry",
  templateUrl: "./add-portfolio-entry.component.html",
  styleUrls: ["./add-portfolio-entry.component.css"]
})
export class AddPortfolioEntryComponent {
  constructor(private portfolioService: PortfolioService) { }

  @Output() portfolioEntryAdded = new EventEmitter<boolean>();
  @Output() closeComponent = new EventEmitter<boolean>();
  @Input() portfolioId: number | null = null;
  error: any = null;
  successMsg = "";

  // Checkt ob im Input Feld eine Taste gedrückt wird
  keyDowned = false;

  addPortfolioEntryForm = new FormGroup<PortfolioEntryForm>({
    description: new FormControl("", { nonNullable: true }),
    value: new FormControl("", { nonNullable: true }),
    datetime: new FormControl("", { nonNullable: true })
  });

  get description() { return this.addPortfolioEntryForm.get("description"); }
  get value() { return this.addPortfolioEntryForm.get("value"); }
  get datetime() { return this.addPortfolioEntryForm.get("datetime"); }


  // Gibt aktuelles Datum als String zurück (nötig für local-datetime input)
  todayAsString() {
    return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -5);
  }


  // Wandelt eingegebenen value in Format 10.000,00 um
  formatCurrency() {

    if (this.value?.value) {
      // evtl. Punkte entfernen und Kommas in Punkte umwandeln
      let formattedValue: string | number = Number(this.value?.value.replaceAll(".", "").replaceAll(",", "."));

      // Nummer formatieren
      formattedValue = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(formattedValue).toString();

      this.value?.setValue(formattedValue);
    }
  }

  // Verhindert, für das Input "Value", dass Key gedrückt gehalten werden kann
  onkeydown(e: KeyboardEvent) {
    const keyPressed = e.key;
    if (this.keyDowned && keyPressed !== "Delete" && keyPressed !== "Backspace") {
      e.preventDefault();
    } else {
      this.keyDowned = true;
    }
  }

  // Bei Keyup von Value wird hier der neu gesetzte Wert geprüft. Wenn ungültig, wird der ursprüngliche Wert gesetzt
  checkCurrencyInput(event: KeyboardEvent) {
    this.keyDowned = false;
    const keyPressed = event.key;
    if (!["ArrowLeft", "ArrowRight", "Tab"].includes(keyPressed)) {
      // Wird Format erfüllt? (10000; 10.000; 10.000,00)
      const validInput = /^\d+((\.(?!\.|,)|\d*)*(,(?!\.)\d{0,2})?)$/g.test(this.value?.value!);

      // Reine Anzahl von Zahlen vor Komma ermitteln
      const valueLength = this.value?.value.split(",")[0].replaceAll(/\D/g, "").length;

      // Wenn Format nicht erfüllt wird, vorherigen Wert setzen, außer wenn inhalt gelöscht wird
      if ((!validInput && keyPressed !== "Delete" && keyPressed !== "Backspace") || valueLength! > 10) {
        // Vorherigen Wert setzen
        this.value?.setValue((event.target as HTMLInputElement).getAttribute("previousValue")!);
        event.preventDefault();
      } else {
        // Vorherigen Wert im Domelement als Attribute hinterlegen
        (event.target as HTMLInputElement).setAttribute("previousValue", this.value?.value!);
      }
    }
  }


  // Speichert den eingegebenen Portfolioentry
  addPortfolioEntry() {
    this.error = {};
    this.successMsg = "";

    // Attribute "value" in number umwandeln
    const formValues: any = this.addPortfolioEntryForm.getRawValue();

    // Portfoliovalue Objekt erzeugen
    // Aus Value Punkte entfernen und Dezimalkomma durch Punkt ersetzen und zu Number casten
    const value: PortfolioEntryValue = { time: formValues.datetime, value: Number(formValues.value.replaceAll(".", "").replace(",", ".")) }

    delete formValues.value;
    delete formValues.datetime;

    // Portfolioentry erzeugen und Values anfügen
    const portfolioEntry: PortfolioEntry = <PortfolioEntry>formValues;
    portfolioEntry.latestValue = value;

    // Portfolio-Id hinzufügen
    portfolioEntry.portfolioId = this.portfolioId!;

    this.portfolioService.postPortfolioEntry(portfolioEntry).subscribe({
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
        console.error("Es ist ein Fehler bei der Anlage des Eintrags aufgetreten", error);
      }
    })

  }
}
