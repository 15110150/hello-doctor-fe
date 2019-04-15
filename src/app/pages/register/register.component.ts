import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "../home/home.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(public nav: NavController, private router: Router) {
  }

  // register and go to home page
  register() {
    this.router.navigateByUrl('/home');
  }

  // go to login page
  login() {
    this.router.navigateByUrl('/login');
  }

}
