import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

/* Diese Komponente wertet ValidationErrors aus und zeigt
   eine entsprechende Meldung in einem Div an. Wird für Inputs genutzt. */
@Component({
	selector: "invalid-input-msg",
	templateUrl: "./invalid-input-msg.component.html",
	styleUrls: ["./invalid-input-msg.component.css"]
})
export class InvalidInputMsgComponent implements OnChanges {
	// Objekt, dass den Invalid-Error enthält
	@Input() errorObject!: ValidationErrors | null | undefined;
	// Individueller Errortext
	@Input() errorText!: string | null | undefined;

	// Message, die angezeigt wird
	message: string | undefined | null = "";

	// Wenn das Errorobjekt sich verändert, die message richtig setzen
	ngOnChanges(changes: SimpleChanges) {
		this.message = "";

		// Errortext nur berücksichtigen wenn in previous oder current ein Wert definiert wurde
		if (changes["errorText"] && !(changes["errorText"].previousValue === undefined
			&& changes["errorText"].currentValue === undefined) && this.errorText != null) {
			this.message += this.errorText + "\n";
		}

		if (changes["errorObject"]) {
			if (this.errorObject?.["required"]) {
				this.message += "Dieses Feld darf nicht leer sein!\n";
			}

			if (this.errorObject?.["minlength"]) {
				this.message += `Es müssen mindestens ${this.errorObject?.["minlength"]?.["requiredLength"]} Zeichen angegeben werden!\n`;
			}

			if (this.errorObject?.["maxlength"]) {
				this.message += `Es dürfen maximal ${this.errorObject?.["maxlength"]?.["requiredLength"]} Zeichen angegeben werden!\n`;
			}

			if (this.errorObject?.["email"]) {
				this.message += "Es wurde keine gültige E-Mail Adresse angegeben!\n";
			}

			if (this.errorObject?.["msg"]) {
				this.message += this.errorObject["msg"] + "\n";
			}
		}
	}
}
