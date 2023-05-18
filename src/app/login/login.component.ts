import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  onSubmit(loginData: NgForm) {
  // Login Daten an Server übertragen
    console.log(loginData.value);
    console.log(loginData.valid);
  }
}
