import { Injectable } from "@angular/core";
import { BACKEND_API_URL } from "../constants";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppResult } from "../shared/interfaces/AppResult";

@Injectable({
	providedIn: "root"
})
export class UserService {

	constructor(private http: HttpClient) { }

	baseUserUrl = BACKEND_API_URL + "/user";

	// Prüft, ob ein Username bereits existiert
	public existsByUsername(username: string): Observable<AppResult> {
		return this.http.get<AppResult>(this.baseUserUrl + `/username/exists/${username}`);
	}

	// Prüft, ob ein User mit einer bestimmte Email-Adresse bereits existiert
	public existsByEmail(email: string): Observable<AppResult> {
		return this.http.get<AppResult>(this.baseUserUrl + `/email/exists/${email}`);
	}

	// Löscht User
	public delete(id: number): Observable<AppResult> {
		return this.http.delete<AppResult>(this.baseUserUrl + `/${id}`);
	}

}
