import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RegistrationService } from "../registration.service";
import { Router } from "@angular/router";
import { passwordStrength, passwordsEqual, email } from "../validators/validation";
import { CheckUsernameAvailability } from "../validators/check-username-availability";

@Component({
	selector: "app-registration",
	templateUrl: "./registration.component.html",
	styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent {

	constructor(public registerService: RegistrationService, private router: Router, private checkUsernameAvailability: CheckUsernameAvailability) { }

	error: any = { msg: "" };

	registerForm = new FormGroup({
		username: new FormControl("", { asyncValidators: this.checkUsernameAvailability.validateUsername.bind(this.checkUsernameAvailability), updateOn: "blur" }),
		email: new FormControl("", { validators: email(), asyncValidators: this.checkUsernameAvailability.validateEmail.bind(this.checkUsernameAvailability), updateOn: "blur" }),
		name: new FormControl(""),
		lastName: new FormControl(""),
		password: new FormControl("", passwordStrength()),
		passwordConfirm: new FormControl("")
	}, { validators: passwordsEqual });

	get username() { return this.registerForm.get("username"); }
	get email() { return this.registerForm.get("email"); }
	get name() { return this.registerForm.get("name"); }
	get lastName() { return this.registerForm.get("lastName"); }
	get password() { return this.registerForm.get("password"); }
	get passwordConfirm() { return this.registerForm.get("passwordConfirm"); }


	// Prüft ob ein formcontrol Invalid ist
	isInValid(input: any) { return input?.errors && input?.invalid && input?.touched }

	// Zeigt, ob es Invalide Felder gibt
	get formInvalid() {
		return this.isInValid(this.username) ||
			this.isInValid(this.email) ||
			this.isInValid(this.name) ||
			this.isInValid(this.lastName) ||
			this.isInValid(this.password) ||
			this.isInValid(this.passwordConfirm)
	}

	registerUser() {
		if (this.registerForm.valid) {
			this.error.msg = "";
			// User registrieren
			this.registerService.registerUser(this.registerForm.value).subscribe({
				next: (response) => {
					if (response.body?.success) {
						// Zur SuccessPage weiterleiten und Username als Queryparameter übergeben
						this.router.navigate(["../registrationSuccess"], { queryParams: { username: response.body.data.username } });
					} else {
						this.error = response.body?.error;
					}
				}, error: (error) => {
					this.error.msg = "Bei der Registrierung ist ein unbekannter Fehler aufgetaucht!";
					console.error("Fehler bei der Registrierung: ", error)
				}
			});
		}
	}

}
