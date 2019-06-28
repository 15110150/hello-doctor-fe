import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/model/account';
import { AlertController } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FBAccount } from 'src/app/model/FBUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account: Account;
  private user: FBAccount;

  constructor(private router: Router, private auth2Service: Auth2Service,
    public alertController: AlertController, private fcmService: FcmService, private authService: AuthService) {

  }

  // signInWithGoogle(): void {
  //  // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     console.log(this.user.authToken);
  //   });
  // }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      console.log(x);
      this.user.token = x.authToken;
      console.log(this.user);
      this.auth2Service.loginWithFB(this.user)
        .subscribe(data => {
          if (data != null) {
            console.log("gogo");
            this.router.navigateByUrl('/main/home');
            this.fcmService.request_permission_for_notifications()
          }
        },
          error => {
            if (error.status == 404) {
              this.notExistAlert();
            }
            else
              this.incorrectAlert();
          });
    });
  }

  ngOnInit() {
    this.account = new Account();
    this.user = new FBAccount();
  }
  // go to register page
  register() {
    this.router.navigateByUrl('/register');
  }

  // login and go to home page
  login() {
    this.auth2Service.login(this.account)
      .subscribe(data => {
        if (data != null) {
          this.router.navigateByUrl('/main/home');
          this.fcmService.request_permission_for_notifications()
        }
      },
        error => {
          if (error.status == 404) {
            this.notExistAlert();
          }
          else
            this.incorrectAlert();
        });
  }

  btnLoginFB_click() {
     this.signInWithFB();
    // console.log(this.user.authToken);
  }

  async notExistAlert() {
    const alert = await this.alertController.create({
      header: 'Đăng nhập không thành công',
      message: 'Tài khoản không tồn tại. Xin quí khách kiểm tra lại thông tin',
      buttons: ['OK']
    });
    await alert.present();
  }

  async incorrectAlert() {
    const alert = await this.alertController.create({
      header: 'Đăng nhập không thành công',
      message: 'Tên đăng nhập hoặc mật khẩu không đúng. Xin quí khách kiểm tra lại thông tin',
      buttons: ['OK']
    });
    await alert.present();
  }
}
