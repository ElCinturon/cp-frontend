import { Component } from '@angular/core';
import { NgForm, FormControl, FormGroup, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { passwordStrength, passwordsEqual } from '../utils/validation';

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
		password: new FormControl("", passwordStrength()),
		passwordConfirm: new FormControl("")
	}, { validators: passwordsEqual});

	constructor(public registerService: RegistrationService, private router: Router) { }

	get username() { return this.registerForm.get('username'); }
	get email() { return this.registerForm.get('email'); }
	get name() { return this.registerForm.get('name'); }
	get lastName() { return this.registerForm.get('lastName'); }
	get password() { return this.registerForm.get('password'); }
	get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }

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
