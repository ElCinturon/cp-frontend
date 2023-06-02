import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (public authService: AuthenticationService) {};

  onSubmit(loginData: NgForm) {
  // Login Daten an Server übertragen
    console.log(loginData.value);
    console.log(loginData.valid);

    // Cookie wird wohl autom. gesetzt
    this.authService.authenticateApp().subscribe(response => {
      console.log("response", response);
      if(response.status === 204)
      {
          console.log("App erfolgreich authentifiziert");
      } else {
          console.log("App authentifizierung fehlgeschlagen.")
      }
    });
  }
}
