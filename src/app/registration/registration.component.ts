import { Component } from '@angular/core';
import { NgForm, FormControl, FormGroup, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

	registerForm = new FormGroup({
		username: new FormControl(""),
		email: new FormControl("", Validators.email),
		name: new FormControl(""),
		lastName: new FormControl(""),
		password: new FormControl("", Validators.pattern(/(?=.*\d)(?=.*\D)(?=.*[a-z])(?=.*[A-Z])(?=.*(\?|@|-|,|\.|\\|_|\*|#|'|!|=|}|{|&|\$|<|>|\(|\)|:|\+|%|§|"|\/|\^)).{8,}/)),
		passwordConfirm: new FormControl("", this.passwordsEqual())
	});

	constructor(public registerService: RegistrationService, private router: Router) { }

	passwordsEqual(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const equal: Boolean = control.value === this.registerForm?.value?.password;

			return equal ? null : { notEqual: { value: control.value } }
		}
	}

	registerUser() {
		if (this.registerForm.valid) {
			console.log("data", this.registerForm.value);
			// User registrieren
			this.registerService.registerUser(this.registerForm.value).subscribe(response => {
				if (response.status === 200) {
					this.router.navigate(["../registrationSuccess"]);
				}
			}, error => { console.log("Fehler bei der Registrierung: ", error) });
		}
	}

}
