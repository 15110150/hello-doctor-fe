import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController,Platform, LoadingController} from "@ionic/angular";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public nav: NavController, public forgotCtrl: AlertController,
     public menu: MenuController, public toastCtrl: ToastController, public router: Router,
     private platform: Platform, public alertController: AlertController, 
     public loadingController: LoadingController,) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.router.navigateByUrl('/register');
  }

  // login and go to home page
  login() {
    this.router.navigateByUrl('/main/home');
  }



}
