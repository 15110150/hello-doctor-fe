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
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { IdbService } from 'src/app/services/index-DB/index-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account: Account;
  private user: FBAccount;
  prmEmail;


  isValidFormSubmitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userForm = this.formBuilder.group({
    Offemail: ['', Validators.email]
  });
  submitted = false;

  constructor(private router: Router, private auth2Service: Auth2Service,
    public alertController: AlertController, private fcmService: FcmService,
    private authService: AuthService, private formBuilder: FormBuilder, private indexDBService: IdbService) {

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
            this.router.navigateByUrl('/main/home');
            this.fcmService.request_permission_for_notifications()
          }
        },
          error => {
            this.errorFBAlert();
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

  get f() { return this.userForm.controls; }

  onFormSubmit(userForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (userForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.login();
  }

  // login and go to home page
  login() {
    this.auth2Service.login(this.account)
      .subscribe(data => {
        if (data != null) {
          this.indexDBService = new IdbService();
          this.router.navigateByUrl('/main/home');
          this.fcmService.request_permission_for_notifications()
        }
      },
        error => {
          if (error.error.message === "Please fill in username and password") {
            this.fillAlert();
          }
          else if (error.error.message === "User not found") {
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
      message: 'Đăng nhập không thành công. Xin quí khách kiểm tra lại thông tin',
      buttons: ['OK']
    });
    await alert.present();
  }

  async errorFBAlert() {
    const alert = await this.alertController.create({
      header: 'Đăng nhập không thành công',
      message: 'Đăng nhập băng Facebook thất bại, vui lòng liên hệ với quản trị viên',
      buttons: ['OK']
    });
    await alert.present();
  }

  async fillAlert() {
    const alert = await this.alertController.create({
      header: 'Đăng nhập không thành công',
      message: 'Vui lòng điển đủ thông tin email và mật khẩu',
      buttons: ['OK']
    });
    await alert.present();
  }
}
