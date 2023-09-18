import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { AuthenticationService } from './../../authentication.service';
import { UserInfoService } from "src/app/services/userInfo.service";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent {

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private authService: AuthenticationService, private userInfoService: UserInfoService) { }

  error = { msg: "" };

  // Löscht Userkonto
  deleteUser() {
    if (confirm("Möchten Sie Ihr Konto wirklich unwiederuflich löschen?")) {
      this.error.msg = "";
      const userId = this.cookieService.get("userId");

      this.userService.delete(Number(userId)).subscribe({
        next: (response) => {
          if (response.success) {
            // Wenn Löschung erfolgreich, Cookies löschen und zur Startseite weiterleiten
            this.deleteCookiesAndRedirect();
          } else {
            this.setProfileDeleteError();
          }
        },
        error: (error) => {
          console.error("Beim Löschen des Profils mit id " + userId + " ist ein Fehler aufgetreten!", error);
          this.setProfileDeleteError();
        }
      });
    }
  }

  // Loggt User aus (Session und alle Cookies werden gelöscht)
  logout() {
    if (confirm("Möchten Sie sich wirklich ausloggen?")) {
      this.error.msg = "";

      this.authService.logout().subscribe({
        next: (response) => {
          if (response.success) {
            // Wenn Logout erfolgreich, Cookies löschen und zur Startseite weiterleiten
            this.deleteCookiesAndRedirect();
          } else {
            this.setLogoutError();
          }
        },
        error: (error) => {
          console.error("Beim Ausloggen ist ein Fehler aufgetreten!", error);
          this.setLogoutError();
        }
      });
    }
  }

  setProfileDeleteError() {
    this.error.msg = "Beim Löschen des Profils ist ein Fehler aufgetreten. Versuchen Sie es später erneut."
  }

  setLogoutError() {
    this.error.msg = "Beim Ausloggen ist ein Fehler aufgetreten. Versuchen Sie es später erneut."
  }

  /**
   * Setzt globalen Username zurück, löscht alle Cookies und navigiert zur Startseite
   */
  deleteCookiesAndRedirect() {
    this.userInfoService.send("");
    this.cookieService.deleteAll();
    this.router.navigate([""]);
  }


}
