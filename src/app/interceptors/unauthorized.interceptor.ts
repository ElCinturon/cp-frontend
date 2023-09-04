import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { EMPTY, Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { PROXY_URL } from "../constants";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      // Bei Response von 401 auf die Login Seite weiterleiten
      if (error.status === 401 && error.url?.includes(PROXY_URL)) {
        this.router.navigate(["/"]);
        return EMPTY;
      }
      return throwError(() => new Error(error.message));
    }));
  }

}
