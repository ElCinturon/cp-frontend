import { ValidatorFn, ValidationErrors, AbstractControl, Validators, AsyncValidatorFn } from '@angular/forms';

/**
 *  Validiert das Passwort und gibt eine entsprechende Msg zurück, wenn Strength nicht erfüllt wurde.
 */
export function passwordStrength(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		// Pattern Validationfunktion mit dem Control als Parameter aufrufen
		let result = Validators.pattern(/(?=.*\d)(?=.*\D)(?=.*[a-z])(?=.*[A-Z])/.source +
			/(?=.*(\?|@|-|,|\.|\\|_|\*|#|'|!|=|}|{|&|\$|<|>|\(|\)|:|\+|%|§|"|\/|\^)).{8,}/.source)(control);

		return result === null ? result : {
			msg: "Das Passwort muss aus Klein- und Großbuchstaben, einer Zahl und einem " +
				"Sonderzeichen bestehen!"
		}
	}
}

/*
 * Prüft ob das Feld password und passwordConfirm eines Formulares übereinstimmen.
 * Wenn nicht, wird an das Form ein Error zurückgegeben und das passwordConfirm Feld erhält ebenfalls einen Error.
 */
export const passwordsEqual: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

	const password = control.get("password")?.value;
	const passwordConfirm = control.get("passwordConfirm")?.value;
	const equal: Boolean = password === passwordConfirm;

	// Wenn Passwörter nicht übereinstimmen, Error für die Passwortbestätigung setzen
	if (!equal) {
		control.get("passwordConfirm")?.setErrors({ msg: "Die Passwörter müssen übereinstimmen!" })
	} else if (control.get("passwordConfirm")?.hasError('msg')) {
		// Wenn Error besteht, aber die Werte gleich sind, Errors entfernen und Status updaten 
		// (nötig wenn erst Confirm und dann pw geändert wird)
		control.get("passwordConfirm")?.setErrors({});
		control.get("passwordConfirm")?.updateValueAndValidity();
	}

	return equal ? null : { passwordConfirm: { msg: "Das Confirm Passwort muss übereinstimmen!" } };
}


/**
 *  Validier Emailadresse mit der Standard Angular Function und zusätzlich wird geprüft ob die Adresse mit domain endet.
 */
export function email(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		// Pattern Validationfunktion mit dem Control als Parameter aufrufen
		let valid = false;
		
		// Email Format checken. Wenn korrekt, prüfen ob mit Domain endet.
		if(!Validators.email(control.value)) {
			const regex = /.*[^@]+\.([a-z]|[A-Z]){2,3}$/
			valid = regex.test(control.value);
		}
		
		return valid ? null : {
			msg: "Bitte geben Sie eine gültige Email-Adresse ein!"
		}
	}
}




