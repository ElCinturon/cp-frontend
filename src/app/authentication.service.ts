import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	authUrl = 'http://localhost:8000/sanctum/csrf-cookie';
	loginUrl = 'http://localhost:8000/login';

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
