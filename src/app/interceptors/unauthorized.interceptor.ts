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
import { CookieService } from "ngx-cookie-service";
import { UserInfoService } from "./../services/userInfo.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService, private userInfoService: UserInfoService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      // Bei Response von 401 auf die Login Seite weiterleiten. Es wird geprüft ob "/api/"-Pfad aufgerufen wird
      if (error.status === 401 && request.url.match(/^\/api\/.*/g)) {
        this.cookieService.deleteAll();
        // User zurück setzen
        this.userInfoService.send("");
        this.router.navigate(["/"]);
        return EMPTY;
      }
      return throwError(() => new Error(error.message));
    }));
  }

}
