import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "./../../authentication.service";
import { UserIdentifierForm } from "src/app/shared/interfaces/UserIdentifier";

@Component({
  selector: "forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent {

  constructor(private authenticationService: AuthenticationService) { }

  successMsg = "";
  error = { msg: "" };

  forgotPw = new FormGroup<UserIdentifierForm>({
    userIdentifier: new FormControl("", { nonNullable: true })
  });

  get userIdentifier() { return this.forgotPw.get("userIdentifier"); }

  // Reset-Link für Email anfordern
  sentResetLink() {
    this.successMsg = "";
    this.error.msg = "";
    this.authenticationService.authenticateApp().subscribe({
      next: (response) => {
        if (response.status === 204) {

          this.authenticationService.sendResetLink(this.forgotPw.getRawValue()).subscribe({
            next: (response) => {
              if (response.success) {
                this.successMsg = "Wenn der eingegebene Nutzer existiert, erhalten Sie eine Nachricht an die hinterlegte E-Mail Adresse."
              } else {
                this.error = response.error.msg;
              }
            },
            error: (error) => {
              console.error("Beim Anfordern des Reset-Links ist ein Fehler aufgetreten", error);
              this.error.msg = "Beim Anfordern eines neuen Passworts ist ein Fehler aufgetreten!"
            }
          });
        }
      }
      ,
      error: (error) => {
      }
    });
  }






}






