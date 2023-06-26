import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { BACKEND_API_URL, BACKEND_URL } from './constants';
import { AppResult } from './shared/interfaces/AppResult';


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	authUrl = BACKEND_URL + "/sanctum/csrf-cookie";
	loginUrl = BACKEND_API_URL + "/login";

	constructor(private http: HttpClient) { }

	// Authentifiziert App ggü. Backend
	public authenticateApp(): Observable<HttpResponse<Object>> {
		return this.http.get(this.authUrl, { observe: 'response', withCredentials: true });
	}

	// User einloggen
	public login(credentialObject: Object): Observable<HttpResponse<AppResult>> {
		return this.http.post<AppResult>(this.loginUrl, credentialObject, { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }), observe: 'response', withCredentials: true });
	}
}
