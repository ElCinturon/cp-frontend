import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserInfoService } from "../services/userInfo.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent {
	error?: any = {};
	constructor(public authService: AuthenticationService, private router: Router, private cookieService: CookieService, private userInfoService: UserInfoService) { }

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
			this.error = {};
			// XSRF-Token holen
			this.authService.authenticateApp().subscribe({
				next: (response) => {
					if (response.status === 204) {
						// User einloggen
						this.authService.login(this.loginForm.value).subscribe({
							next: (response) => {
								// Wenn Login erfolgreich, auf home Seite weiterleiten
								if (response.body?.success) {
									const username = response.body.data?.username;
									const userId = response.body.data?.id;
									// Setzen des Usernames publishen 
									this.userInfoService.send(username);
									// Cookie mit Information setzen (Evtl. in service auslagern)
									this.cookieService.set("username", username);
									this.cookieService.set("userId", userId);
									this.router.navigate(["../home"]);
								} else {
									this.error = response.body?.error
								}
							},
							error: (error) => {
								this.error.msg = "Der Login konnte wegen eines unbekannten Problems nicht durchgeführt werden."
								console.error("Login konnte wegen folgendem Problem nicht ausgeführt werden: ", error);
							}
						});
					}
				}
				,
				error: (error) => {
					this.error.msg = "Es liegt ein schwerwiegender Fehler vor!"
					console.error("Es ist ein schwerwiegendes App-Authentifikationsproblem aufgetreten!", error);
				}
			});
		}

	}
}


