import { Component, EventEmitter, Input, OnInit, Output, ViewChild, } from "@angular/core";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioEntry, PortfolioEntryForm } from "src/app/shared/interfaces/PortfolioEntry";
import { ToastService } from "angular-toastify";
import { ValueModalComponent } from "../value-modal/value-modal.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "portfolio-entry-list",
  templateUrl: "./portfolio-entry-list.component.html",
  styleUrls: ["./portfolio-entry-list.component.css"]
})
export class PortfolioEntryListComponent implements OnInit {

  constructor(private portfolioService: PortfolioService, private _toastService: ToastService) { }

  @ViewChild(ValueModalComponent)
  private modalComponent!: ValueModalComponent;

  @Output() listChanged = new EventEmitter<boolean>();
  @Input() portfolioId: number | null = null;
  portfolioEntries: PortfolioEntry[] = [];
  portfolioEntriesSet = false;
  entryId: number | null = null;
  showModal = false;
  error: any = {};
  editingEntryId: number | null = null;
  formGroups: FormGroup<PortfolioEntryForm>[] = [];

  ngOnInit() {
    this.updatePortfolioEntries();
  }

  // Ruft die aktuellen Einträge des aktuellen Portfolios ab
  updatePortfolioEntries() {
    this.formGroups = [];
    this.portfolioService.getPortfolioEntries(this.portfolioId!).subscribe({
      next: (response => {
        this.portfolioEntries = response;
        this.portfolioEntriesSet = true;

        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            const entry = response[i];
            this.formGroups.push(
              new FormGroup<PortfolioEntryForm>({
                description: new FormControl(entry.description, { nonNullable: true }),
                value: new FormControl(entry.latestValue?.value.toString()!, { nonNullable: true }),
                datetime: new FormControl(entry.createdAt, { nonNullable: true }),
              })
            );
          }
        }

      }),
      error: (error => {
        console.error("Beim Abruf der Portfolioeinträge zu Portoflio mit id " + this.portfolioId + " ist ein Fehler aufgetreten", error);
        this.error.msg = "Bei der Anzeige der Portfolioeinträge ist ein Fehler aufgetreten!";
      })
    })
  }

  deletePortfolioEntry(id: number) {
    if (id && this.portfolioId)
      if (confirm("Möchten Sie den Eintrag wirklich entfernen?")) {
        this.portfolioService.deletePortfolioEntry(this.portfolioId, id).subscribe({
          next: ((response) => {
            if (response.success) {
              // Aktualisierung von Portfoliogesamtwert anstoßen
              this.emitChange();
              this._toastService.success("Eintrag erfolgreich entfernt!");

              // Liste aktualisieren
              this.updatePortfolioEntries();
            } else {
              this.deleteErrorToast();
            }
          }),
          error: ((error) => {
            console.error(`Beim Löschen des Eintrags mit id ${id} ist ein Fehler aufgetreten`, error);
            this.deleteErrorToast();
          })
        })
      }

  }

  saveEntry(index: number) {
    const entryFormGroup: FormGroup<PortfolioEntryForm> = this.formGroups[index];

    const newEntry: PortfolioEntry = Object.assign(this.portfolioEntries[index], entryFormGroup.getRawValue());

    this.portfolioService.putPortfolioEntry(this.portfolioId!, this.portfolioEntries[index].id!, newEntry).subscribe({
      next: (response => {
        if (response.success) {
          this.leaveEditMode();
          this._toastService.success("Eintrag erfolgreich geändert!");
          this.updatePortfolioEntries();
        } else {
          this.editErrorToast();
        }
      }),
      error: (error) => {
        console.error("Beim Ändern des Eintrages mit ID " + this.portfolioEntries[index].id! + " ist ein Fehler aufgetreten:", error);
        this.editErrorToast();
      }
    })
  }

  deleteErrorToast() {
    this._toastService.error("Beim Löschen des Eintrags ist ein Fehler aufgetreten!");
  }

  editErrorToast() {
    this._toastService.error("Beim Ändern des Eintrags ist ein Fehler aufgetreten!");
  }

  emitChange() {
    this.listChanged.emit(true);
  }

  // Steuert was passiert wenn ein Entry angeklickt wird
  clickEntry(event: Event, entryId: number) {
    const target = event.target as HTMLElement;

    // Wurde ein anderer Button geklickt? Dann Modal nicht öffnen (Kann Icon sein oder wrapped DIV)
    if (!this.editingEntryId && !target.id.includes("deleteButton") && !target.parentElement!.id.includes("deleteButton") &&
      !target.id.includes("editButton") && !target.parentElement!.id.includes("editButton") &&
      !target.id.includes("leaveButton") && !target.parentElement!.id.includes("leaveButton") &&
      !target.id.includes("saveButton") && !target.parentElement!.id.includes("saveButton")) {
      this.entryId = entryId
      this.modalComponent.show();
    }
  }

  leaveEditMode(index: number | null = null, reset = false) {
    this.editingEntryId = null;

    if (reset && typeof index == "number") {
      // In dem Formgroup den ursprünglichen Wert setzen
      this.formGroups[index].patchValue({
        description: this.portfolioEntries[index].description
      })
    }
  }

}
