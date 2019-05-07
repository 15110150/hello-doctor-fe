import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.scss']
})
export class MenuAccountComponent implements OnInit {

  public userProfile: Patient;
  constructor(private accountService: PatientService, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userProfile = new Patient();
    this.getProfile();
  }

  getProfile(){
    this.accountService.getUser()
    .subscribe(result => {
      this.userProfile = result;
      console.log(this.userProfile);
    });
  }

  btnLogout_click(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
