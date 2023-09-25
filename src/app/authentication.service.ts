import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponse, HttpHeaders } from "@angular/common/http";
import { BACKEND_API_URL } from "./constants";
import { AppResult } from "./shared/interfaces/AppResult";
import { UserIdentifier } from "./shared/interfaces/UserIdentifier";


@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	authUrl = "/sanctum/csrf-cookie";
	loginUrl = BACKEND_API_URL + "/login";
	forgotPwUrl = BACKEND_API_URL + "/forgot-password";
	resetPwUrl = BACKEND_API_URL + "/reset-password";

	constructor(private http: HttpClient) { }

	// Authentifiziert App ggü. Backend
	public authenticateApp(): Observable<HttpResponse<Object>> {
		return this.http.get(this.authUrl, { observe: "response", withCredentials: true });
	}

	// User einloggen
	public login(credentialObject: Object): Observable<HttpResponse<AppResult>> {
		return this.http.post<AppResult>(this.loginUrl, credentialObject, { headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*" }), observe: "response", withCredentials: true });
	}

	// Loggt User aus
	public logout(): Observable<AppResult> {
		return this.http.post<AppResult>(BACKEND_API_URL + "/logout", "");
	}

	// Schickt Link an User, um PW zurückzusetzen
	public sendResetLink(userIdentifier: UserIdentifier): Observable<AppResult> {
		return this.http.post<AppResult>(this.forgotPwUrl, userIdentifier);
	}

	// Resetet PW von User
	public resetPw(userIdentifier: UserIdentifier, resetToken: string): Observable<AppResult> {
		return this.http.post<AppResult>(this.resetPwUrl + "?resetToken=" + resetToken, userIdentifier);
	}
}
