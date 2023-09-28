import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/authentication.service";
import { ResetPwForm } from "src/app/shared/interfaces/ResetPwForm";
import { passwordStrength, passwordsEqual } from "src/app/validators/validation";

@Component({
  selector: "reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent {

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  // PW-Reset-Token aus Urlparam holen
  token = this.route.snapshot.queryParams["resetToken"];
  successMsg = "";
  error = { msg: "" };

  resetPwForm = new FormGroup<ResetPwForm>({
    userIdentifier: new FormControl("", { nonNullable: true }),
    password: new FormControl("", { nonNullable: true, validators: passwordStrength() }),
    passwordConfirm: new FormControl("", { nonNullable: true })
  }, { validators: passwordsEqual });

  get userIdentifier() { return this.resetPwForm.get("userIdentifier"); }
  get password() { return this.resetPwForm.get("password"); }
  get passwordConfirm() { return this.resetPwForm.get("passwordConfirm"); }

  // Password zurücksetzen
  resetPw() {
    this.successMsg = "";
    this.error.msg = "";

    if (this.token) {
      this.authenticationService.authenticateApp().subscribe({
        next: (response) => {
          if (response.status === 204) {

            this.authenticationService.resetPw(this.resetPwForm.getRawValue(), this.token).subscribe({
              next: (response) => {
                if (response.success) {
                  this.successMsg = "Das Passwort wurde erfolgreich geändert!";
                } else {
                  this.error = response.error;
                }
              },
              error: (error) => {
                console.error("Beim Zurücksetzen des Passworts ist ein Fehler aufgetreten", error);
                this.error.msg = "Beim Zurücksetzen des Passworts ist ein Fehler aufgetreten!"
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

}
