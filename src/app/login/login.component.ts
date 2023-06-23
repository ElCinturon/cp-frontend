import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	errorMessage?: string = "";
	constructor(public authService: AuthenticationService, private router: Router) { };

	loginForm = new FormGroup({
		userIdentifier: new FormControl(""),
		password: new FormControl(""),
		stayLoggedIn: new FormControl("")
	});

	/**
	 * Ruft den XSRF-Token ab und loggt den User anschließend ein.
	 * @param loginData 
	 */
	loginUser() {
		if (this.loginForm.valid) {
			// XSRF-Token holen
			this.authService.authenticateApp().subscribe({
				next: (response) => {
					if (response.status === 204) {
						// User einloggen
						this.authService.login(this.loginForm.value).subscribe({
							next: (response) => {
								// Wenn Login erfolgreich, auf home Seite weiterleiten
								if (response.body?.success) {
									this.router.navigate(["../home"]);
								} else {
									this.errorMessage = response.body?.error
								}
							},
							error: (error) => {
								this.errorMessage = "Der Login konnte wegen eines unbekannten Problems nicht durchgeführt werden."
								console.error("Login konnte wegen folgendem Problem nicht ausgeführt werden: ", error);
							}
						});
					}
				}
				,
				error: (error) => {
					this.errorMessage = "Es liegt ein schwerwiegender Fehler vor!"
					console.error("Es ist ein schwerwiegendes App-Authentifikationsproblem aufgetreten!", error);
				}
			});
		}

	}
}


