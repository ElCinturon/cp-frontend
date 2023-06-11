import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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


	loginUser(loginData: NgForm) {
		if (loginData.valid) {
			// XSRF-Token holen
			this.authService.authenticateApp().subscribe(response => {
				if (response.status === 204) {
					// User einloggen
					this.authService.login(loginData.value).subscribe(response => {
						// Wenn Login erfolgreich, auf home Seite weiterleiten
						if (response.status === 200) {
							this.router.navigate(["../home"]);
						}
					},
						error => { this.errorMessage = error.error; });
				}
			}, error => { console.log("Es ist ein schwerwiegendes Authentifikationsproblem aufgetreten!", error) });

		}
	}

}
