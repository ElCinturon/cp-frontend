import { Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	baseUserUrl = BACKEND_API_URL + "/user";
	
	// Prüft, ob ein Username bereits existiert
	public existsByUsername(username: string): Observable<any> {	
		return this.http.get(this.baseUserUrl + `/username/exists/${username}`);
	}
	
	// Prüft, ob ein User mit einer bestimmte Email-Adresse bereits existiert
	public existsByEmail(email: string): Observable<any> {	
		return this.http.get(this.baseUserUrl + `/email/exists/${email}`);
	}



}
