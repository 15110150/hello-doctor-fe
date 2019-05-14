import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { LoginComponent } from "../login/login.component";
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Auth2Service } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public account: Account;
  public password2: any;

  constructor(public authService: Auth2Service, private router: Router) {
  }

  ngOnInit(){
    this.account = new Account();
  }

  // register and go to home page
  btnRegister_click() {
    if (this.account.password != this.password2) {
      alert("2 mật khẩu không khớp")
    }
    else {
      this.authService.register(this.account)
        .subscribe(data => {
          alert("Tạo tài khoản thành công")
          this.router.navigateByUrl('/login');
        },
          error => {
            alert('Tạo tài khoản thất bại');
          }
        );
    }
  }

  // go to login page
  login() {
    this.router.navigateByUrl('/login');
  }

}
