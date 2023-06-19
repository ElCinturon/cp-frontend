import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from './constants';

@Injectable({
	providedIn: 'root'
})
export class RegistrationService {

	registerUrl = BACKEND_API_URL + "/registration";

	constructor(private http: HttpClient) { }

	// User registrieren
	public registerUser(registerObject: Object): Observable<HttpResponse<Object>> {
		return this.http.post(this.registerUrl, registerObject, {
			headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }),
			observe: 'response', withCredentials: true
		});
	}
}
