import { Component, Input, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

/* Diese Komponente wertet ValidationErrors aus und zeigt
   eine entsprechende Meldung in einem Div an. Wird für Inputs genutzt. */
@Component({
	selector: 'invalid-input-msg',
	templateUrl: './invalid-input-msg.component.html',
	styleUrls: ['./invalid-input-msg.component.css']
})
export class InvalidInputMsgComponent {
	// Objekt, dass den Invalid-Error enthält
	@Input() errorObject!: ValidationErrors | null | undefined;
	@Input() errorText!: string | null | undefined;

	// Message, die angezeigt wird
	message: string | undefined | null = "";

	// Wenn das Errorobjekt sich verändert, die message richtig setzen
	ngOnChanges(changes: SimpleChanges) {
		if (changes["errorText"]) {
			this.message = this.errorText;
		}

		if (changes["errorObject"]) {
			if (this.errorObject?.["required"]) {
				this.message = "Dieses Feld darf nicht leer sein."
			}
			else if (this.errorObject?.["minlength"]) {
				this.message = `Es müssen mindestens ${this.errorObject?.['minlength']?.['requiredLength']} Zeichen angegeben werden.`
			}
			else if (this.errorObject?.["maxlength"]) {
				this.message = "Es dürfen maximal X Zeichen angegeben werden."
			}
			else if (this.errorObject?.["email"]) {
				this.message = "Es wurde keine gültige E-Mail Adresse angegeben."
			} else if (this.errorObject?.["msg"]) {
				this.message = this.errorObject["msg"];
			}
		}
	}
}
