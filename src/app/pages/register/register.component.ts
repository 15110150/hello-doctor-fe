import { Component, OnInit } from "@angular/core";
import { NavController, AlertController } from "@ionic/angular";
import { LoginComponent } from "../login/login.component";
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Auth2Service } from 'src/app/services/auth/auth.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public account: Account;
  public password2: any;

  constructor(public authService: Auth2Service, private router: Router,
    public alertController: AlertController, private accountService: PatientService) {
  }

  ngOnInit(){
    this.account = new Account();
  }

  // register and go to home page
  btnRegister_click() {
    if (this.account.password != this.password2) {
      this.notSamePassAlert();
    }
    else {
      this.accountService.register(this.account)
        .subscribe(data => {
          this.okAlert();
          this.router.navigateByUrl('/login');
        },
          error => {
            this.errorAlert();
          }
        );
    }
  }

  // go to login page
  login() {
    this.router.navigateByUrl('/login');
  }

  async notSamePassAlert() {
    const alert = await this.alertController.create({
      header: 'Tạo tài khoản thất bại',
      message: 'Hai mật khẩu không khớp. Xin quí khách kiểm tra lại',
      buttons: ['OK']
    });

    await alert.present();
  }

  async okAlert() {
    const alert = await this.alertController.create({
      header: 'Tạo tài khoản thành công',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Tạo tài khoản thất bại',
      buttons: ['OK']
    });

    await alert.present();
  }

}
