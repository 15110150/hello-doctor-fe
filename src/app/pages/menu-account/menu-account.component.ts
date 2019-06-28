import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { Router, NavigationEnd } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Auth2Service } from 'src/app/services/auth/auth.service';
import { FcmService } from 'src/app/services/fcm/fcm.service';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.scss']
})
export class MenuAccountComponent implements OnInit, OnDestroy {

  navigationSubscription
  public userProfile: Patient;

  constructor(private accountService: PatientService, private authService: Auth2Service,
    private router: Router, private fcmSerVice: FcmService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getProfile();
      }
    });
  }

  ngOnInit() {
    this.userProfile = new Patient();
    this.getProfile();
  }

  getProfile() {
    this.accountService.getUser()
      .subscribe(result => {
        this.userProfile = result;
      });
  }

  btnLogout_click() {
    this.fcmSerVice.logout().then(result => { 
      console.log(result);
      this.router.navigateByUrl('/login'); }

    )
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
