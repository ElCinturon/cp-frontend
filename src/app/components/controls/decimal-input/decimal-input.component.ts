import { formatNumber } from "@angular/common";
import { Component, Input, Renderer2, ElementRef, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NumberTostringDecimal } from "src/app/shared/helper/decimal";

@Component({
  selector: "decimal-input",
  templateUrl: "./decimal-input.component.html",
  styleUrls: ["./decimal-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DecimalInputComponent,
      multi: true,
    },
  ]
})
export class DecimalInputComponent implements ControlValueAccessor {

  constructor(private renderer: Renderer2) { }

  // Labelbezeichnung des Inputs
  @Input() label = "";
  // Hält immer den aktuellen Wert des Inputs
  value = "";
  // Hält immer den vorherigen Wert nach Änderung
  previousValue = "";
  // Zeigt an, ob gerade ein Key gedrückt gehalten wird
  keyDowned = false;

  disabled = false;
  onTouched = () => null;
  formControl: FormControl = new FormControl<number>(0);
  onChange = (val: string) => null;
  touched = false;

  // Hält das DOM des Inputfeldes
  @ViewChild("value", { static: false }) domInput: ElementRef | undefined;

  // Wandelt eingegebenen value in Format 10.000,00 um
  formatCurrency() {
    this.markAsTouched();
    if (this.value) {
      // evtl. Punkte entfernen und Kommas in Punkte umwandeln
      let formattedValue: string | number = Number(this.value.replaceAll(".", "").replaceAll(",", "."));
      // Nummer formatieren
      formattedValue = formatNumber(formattedValue, "de", "1.2-2");
      this.renderer.setProperty(this.domInput?.nativeElement, "value", formattedValue);

      this.value = formattedValue;
      this.onChange(this.value);
    }
  }

  // Verhindert, dass Key gedrückt gehalten werden kann
  keydown(e: KeyboardEvent) {
    const keyPressed = e.key;
    if (this.keyDowned && keyPressed !== "Delete" && keyPressed !== "Backspace") {
      e.preventDefault();
    } else {
      this.keyDowned = true;
    }
  }

  keyup(event: KeyboardEvent, value: any) {
    this.keyDowned = false;
    const keyPressed = event.key;

    if (!["ArrowLeft", "ArrowRight", "Tab"].includes(keyPressed)) {
      // Wird Format erfüllt? (10000; 10.000; 10.000,00)
      const validInput = /^\d+((\.(?!\.|,)|\d*)*(,(?!\.)\d{0,2})?)$/g.test(value);

      // Reine Anzahl von Zahlen vor Komma ermitteln
      const valueLength = value.split(",")[0].replaceAll(/\D/g, "").length;

      // Wenn Format nicht erfüllt wird, vorherigen Wert setzen, außer wenn inhalt gelöscht wird
      if ((!validInput && keyPressed !== "Delete" && keyPressed !== "Backspace") || valueLength > 10) {
        // Vorherigen Wert setzen
        this.value = this.previousValue;
        // Änderung in Input wiederspiegeln
        this.renderer.setProperty(this.domInput?.nativeElement, "value", this.previousValue);
        this.onChange(this.value);
        event.preventDefault();
      } else {
        this.value = value;
        // Vorherigen Wert speichern
        this.previousValue = value;
        // Änderung in Parent pushen
        this.onChange(this.value);
      }
    }
  }

  // Setzt Wert in den lokalen Variablen, wenn aus Parent Value geändert wird
  writeValue(value: number) {
    /* Eingehender Wert wird im Number-Typ angenommen, aber Umwandlung geht von formatierten Wert aus
       Also 5000.00 => 5000,00 damit Formatierung funktioniert */
    const newValue = NumberTostringDecimal(value);
    this.previousValue = this.value;
    this.value = newValue;
    if (newValue) {
      // Timeout nötig wegen Bug, da viewchild vor der View ausgeführt wird und somit noch nicht verfügbar ist
      setTimeout(() => this.formatCurrency(), this.domInput ? 0 : 5);
    }
  }


  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }


}
