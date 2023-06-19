import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { BACKEND_API_URL, BACKEND_URL } from './constants';


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
	public login(credentialObject: Object): Observable<HttpResponse<Object>> {
		return this.http.post(this.loginUrl, credentialObject, { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }), observe: 'response', withCredentials: true });
	}
}
