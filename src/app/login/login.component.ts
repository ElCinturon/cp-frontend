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
	error?: string = "";
	constructor(public authService: AuthenticationService, private router: Router) { };

	onSubmit(loginData: NgForm) {
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
					error => { this.error = error.error; console.log("error", error); });
			}
		}, response => {console.log("Problem bei App-Auth aufgetreten.")});

	}
}
