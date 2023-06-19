import { Injectable } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { Observable, throwError, map, catchError, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class CheckUsernameAvailability {
	constructor(private userService: UserService) { }

	// Prüft anhand von Anfrage an das Backend, ob Username bereits existiert
	validateUsername(
		control: AbstractControl
	): Observable<ValidationErrors | null> {
		// Nur feuern wenn etwas eingegeben. Sonst kommt bei Aufruf Konsolenfehler
		if (control.value) {
			return this.userService.existsByUsername(control.value).pipe(
				map(response => response?.userExists ? { msg: "Dieser Username existiert bereits" } : null),
				catchError(() => of({ msg: "Bei der Validierung des Usernames ist ein Fehler aufgetreten!" }))
			);
		} else {
			return of(null);
		}
	}
	
	// Prüft anhand von Anfrage an das Backend, ob Username mit der Email bereits existiert
	validateEmail(
		control: AbstractControl
	): Observable<ValidationErrors | null> {
		// Nur feuern wenn etwas eingegeben. Sonst kommt bei Aufruf Konsolenfehler
		if (control.value) {
			return this.userService.existsByEmail(control.value).pipe(
				map(response => response?.userExists ? { msg: "Es existiert bereits ein Nutzer mit dieser Email!" } : null),
				catchError(() => of({ msg: "Bei der Validierung der Email ist ein Fehler aufgetreten!" }))
			);
		} else {
			return of(null);
		}
	}
}
