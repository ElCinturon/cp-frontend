import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authUrl = 'http://localhost:8000/sanctum/csrf-cookie';

  constructor(private http: HttpClient) { }

  // Authentifiziert App ggü. Backend
  public authenticateApp(): Observable<HttpResponse<Object>> {
    return this.http.get(this.authUrl, {observe: 'response'});
  }
}
