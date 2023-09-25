import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "./../../authentication.service";
import { email } from "src/app/validators/validation";
import { UserIdentifierForm } from "src/app/shared/interfaces/UserIdentifier";

@Component({
  selector: "forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent {

  constructor(private authenticationService: AuthenticationService) { }

  forgotPw = new FormGroup<UserIdentifierForm>({
    userIdentifier: new FormControl("", { nonNullable: true, validators: email() })
  });

  get userIdentifier() { return this.forgotPw.get("userIdentifier"); }

  // Reset-Link für Email anfordern
  sentResetLink() {
    this.authenticationService.authenticateApp().subscribe({
      next: (response) => {
        if (response.status === 204) {

          this.authenticationService.sendResetLink(this.forgotPw.getRawValue()).subscribe({
            next: (response) => {
              console.log("succ", response);
            },
            error: (error) => {
              console.log("error", error);
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






