import { Component, EventEmitter, Input, OnInit, Output, ViewChild, } from "@angular/core";
import { PortfolioService } from "src/app/services/portfolio.service";
import { PortfolioEntry } from "src/app/shared/interfaces/PortfolioEntry";
import { ToastService } from "angular-toastify";
import { ValueModalComponent } from "../value-modal/value-modal.component";

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

  ngOnInit() {
    this.updatePortfolioEntries();
  }

  // Ruft die aktuellen Einträge des aktuellen Portfolios ab
  updatePortfolioEntries() {
    this.portfolioService.getPortfolioEntries(this.portfolioId!).subscribe({
      next: (response => {
        this.portfolioEntries = response;
        this.portfolioEntriesSet = true;
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
              this.errorToast();
            }
          }),
          error: ((error) => {
            console.error(`Beim Löschen des Eintrags mit id ${id} ist ein Fehler aufgetreten`, error);
            this.errorToast();
          })
        })
      }

  }

  errorToast() {
    this._toastService.error("Beim Löschen des Eintrags ist ein Fehler aufgetreten!");
  }

  emitChange() {
    this.listChanged.emit(true);
  }

  // Steuert was passiert wenn ein Entry angeklickt wird
  clickEntry(event: Event, entryId: number) {
    const target = event.target as HTMLElement;

    // Wurde delete Button geklickt? Dann Modal nicht öffnen (Kann Icon sein oder wrapped DIV)
    if (!target.id.includes("deleteButton") && !target.parentElement!.id.includes("deleteButton")) {
      this.entryId = entryId
      this.modalComponent.show();
    }
  }

}
