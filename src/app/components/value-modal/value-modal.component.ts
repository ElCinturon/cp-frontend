import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastService } from "angular-toastify";
import * as bootstrap from "bootstrap";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioEntry } from "src/app/shared/interfaces/PortfolioEntry";
import { PortfolioEntryValue, PortfolioEntryValueForm } from "src/app/shared/interfaces/PortfolioEntryValue";
import { stringDecimalToNumber } from "./../../shared/helper/decimal";

@Component({
  selector: "value-modal",
  templateUrl: "./value-modal.component.html",
  styleUrls: ["./value-modal.component.css"]
})
export class ValueModalComponent implements OnChanges {

  constructor(private portfolioService: PortfolioService, private _toastService: ToastService) { }

  @Output() valueChanged = new EventEmitter<boolean>();
  @Input() portfolioId: number | null = null;
  @Input() entryId: number | null = null;
  entry: PortfolioEntry | null = null;
  addValueActive = false;
  error = { msg: "" };

  groups: FormGroup<PortfolioEntryValueForm>[] = [];
  editingEntryValueId: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    // Sorgt immer für den aktuell aufgerufenen Eintrag
    if (changes["entryId"] || changes["portfolioId"]) {
      this.error = { msg: "" };
      this.getEntry();
    }
  }

  // Ruft anhand der EntryId und PortfolioId den korrekten Entry ab
  getEntry() {
    this.error.msg = "";
    if (this.portfolioId != null && this.entryId != null) {
      this.portfolioService.getPortfolioEntry(this.portfolioId, this.entryId).subscribe({
        next: (response) => {
          this.groups = [];
          this.entry = response;

          // Für jeden entry ein Formgroup erstellen für Editierung
          if (response.portfolioEntryValues.length > 0) {

            for (let i = 0; i < response.portfolioEntryValues.length; i++) {
              const entryValue = response.portfolioEntryValues[i];

              this.groups?.push(
                new FormGroup<PortfolioEntryValueForm>({
                  value: new FormControl(entryValue.value.toString(), { nonNullable: true }),
                  time: new FormControl(entryValue.time, { nonNullable: true })
                })
              );
            }
          }

        },
        error: (error) => {
          this.error.msg = "Beim Abruf des Eintrages ist ein Fehler aufgetreten!"
          error.log("Beim Abruf des Eintrages ist ein Fehler aufgetreten: ", error);
        }
      })

    }
  }

  addValue() {
    this.addValueActive = !this.addValueActive;
  }

  // Zeigt Modal
  show() {
    const modal = new bootstrap.Modal(document.getElementById("valueModal") as Element);
    modal.show();
  }

  /**
   *  Speichert Änderung eines Values. Index stellt index innerhalb der Groups dar
   */
  saveValue(index: number, id: number) {
    const newValue: FormGroup<PortfolioEntryValueForm> = this.groups[index];

    // Neue Werte abrufen
    const time = newValue.get("time")!.value;
    const value = stringDecimalToNumber(newValue.get("value")!.value);

    // Neuen Entry erzeugen
    const newEntryValue: PortfolioEntryValue = { time, value };

    // Wert aktualisieren
    this.portfolioService.putPortfolioEntryValue(this.portfolioId!, this.entryId!, id,
      newEntryValue).subscribe({
        next: (response) => {
          if (response.success) {
            this._toastService.success("Der Werteeintrag wurde erfolgreich geändert!");
            this.getEntry();
            this.valueChanged.emit(true);
          } else {
            this.errorToastValue();
          }
        },
        error: (error) => {
          this.errorToastValue();
          console.log("Beim Ändern des Wertes mit id " + id + " ist ein Fehler aufgetreten!", error);
        }
      })
    this.leaveEditMode(index);
  }

  leaveEditMode(index: number, reset = false) {
    this.editingEntryValueId = null;

    if (reset) {
      // In dem Formgroup die ursprünglichen Werte setzen
      this.groups[index].setValue({
        value: this.entry?.portfolioEntryValues[index].value.toString()!,
        time: this.entry?.portfolioEntryValues[index].time!
      })
    }
  }

  // Löscht entryvalue
  deleteValue(id: number) {
    this.error.msg = "";
    if (this.portfolioId != null && this.entryId != null) {
      if (confirm("Soll dieser Wert wirklich entfernt werden?")) {
        this.portfolioService.deletePortfolioEntryValue(this.portfolioId, this.entryId, id).subscribe({
          next: (response) => {
            if (response.success) {
              this._toastService.success("Eintrag erfolgreich entfernt!");
              this.getEntry();
              this.valueChanged.emit(true);
            } else {
              this.error = response.error;
            }
          },
          error: (error) => {
            const errorTxt = "Beim Löschen des Eintrags ist ein Fehler aufgetreten!"
            this.error.msg = errorTxt;
            console.error(errorTxt, error);
          }
        })
      }
    }
  }

  errorToastValue() {
    this._toastService.error("Beim Ändern des Wertes ist ein Fehler aufgetreten!");
  }

}
