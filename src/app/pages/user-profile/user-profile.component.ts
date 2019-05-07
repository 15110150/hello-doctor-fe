import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userProfile : Patient;

  constructor(private patientService: PatientService, private _location: Location) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.patientService.getUser() 
    .subscribe(result => {
      this.userProfile = result;
      console.log(this.userProfile);
    });
  }

  btnBack_click(){
    this._location.back();
  }
}
