import { Component, Input } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

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

  @Input() label = "";
  value = "";
  disabled = false;
  onTouched = () => null;
  formControl: FormControl = new FormControl<number>(0);
  keyDowned = false;

  onChange = (val: number) => null;
  touched = false;


  // Wandelt eingegebenen value in Format 10.000,00 um
  formatCurrency() {
    console.log("blur");
    if (this.value) {
      // evtl. Punkte entfernen und Kommas in Punkte umwandeln
      let formattedValue: string | number = Number(this.value.replaceAll(".", "").replaceAll(",", "."));

      // Nummer formatieren
      formattedValue = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(formattedValue).toString();

      this.value = formattedValue;
    }
  }

  // Verhindert, dass Key gedrückt gehalten werden kann
  onkeydown(e: KeyboardEvent, value: any) {
    console.log("val", JSON.stringify(value));
    const keyPressed = e.key;
    this.value = value;
    this.onChange(Number(this.value));
    if (this.keyDowned && keyPressed !== "Delete" && keyPressed !== "Backspace") {
      e.preventDefault();
    } else {
      this.keyDowned = true;
    }
  }

  checkCurrencyInput(event: KeyboardEvent) {
    this.keyDowned = false;
    const keyPressed = event.key;
    console.log("v", this.value);
    if (!["ArrowLeft", "ArrowRight", "Tab"].includes(keyPressed)) {
      // Wird Format erfüllt? (10000; 10.000; 10.000,00)
      const validInput = /^\d+((\.(?!\.|,)|\d*)*(,(?!\.)\d{0,2})?)$/g.test(this.value);

      // Reine Anzahl von Zahlen vor Komma ermitteln
      const valueLength = this.value.split(",")[0].replaceAll(/\D/g, "").length;

      // Wenn Format nicht erfüllt wird, vorherigen Wert setzen, außer wenn inhalt gelöscht wird
      if ((!validInput && keyPressed !== "Delete" && keyPressed !== "Backspace") || valueLength > 10) {
        // Vorherigen Wert setzen
        this.value = (event.target as HTMLInputElement).getAttribute("previousValue")!;
        this.onChange(Number(this.value));
        event.preventDefault();
      } else {
        // Vorherigen Wert im Domelement als Attribute hinterlegen
        (event.target as HTMLInputElement).setAttribute("previousValue", this.value);
        console.log("value this", this.value);
        this.onChange(Number(this.value));
      }
    }
  }

  // checkInput(event: any) {
  //   console.log("input", event);
  //   //this.value = 2222;
  //   this.onChange(this.value);
  //   this.formControl.setValue(3333, { emitEvent: false });
  // }

  writeValue(value: string) {
    console.log("value", value);
    this.formControl.setValue(value, { emitEvent: false });
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
