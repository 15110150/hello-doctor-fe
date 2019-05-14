import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/model/account';
// import { AuthService } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account: Account;
  //private user: SocialUser;

  constructor(private router: Router, private auth2Service: Auth2Service) {

  }

  // signInWithGoogle(): void {
  //  // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     console.log(this.user.authToken);
  //   });
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  ngOnInit() {
    this.account = new Account();
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
        }
      },
        error => {
          if (error.status = 404) {
            alert('Tài khoản không tồn tại');
          }
          else
            alert('Tên đăng nhập hoặc mật khẩu không đúng');
        });
  }

  btnLoginFB_click() {
    // this.signInWithFB();
    // console.log(this.user.authToken);
  }
}
