import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  onSubmit(registerData: NgForm) {
    // Registrierungs Daten an Server übertragen
    console.log(registerData.value);
    console.log(registerData.valid);
  }

}
