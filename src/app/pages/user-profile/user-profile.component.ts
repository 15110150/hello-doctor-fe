import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userProfile : Patient;
  isEdit = true;

  constructor(private patientService: PatientService, private _location: Location,
    public alertController: AlertController) { }

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

  btnEdit_click(){
    this.isEdit = false;
    console.log(this.isEdit);
  }

  btnSave_click(userProfile: Patient){
    this.patientService.updateUser(userProfile)
    .subscribe(result=> {
      this.successAlert();
      this.getProfile(); 
    })
    this.isEdit = true;
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Cập nhật hồ sơ thành công',
      buttons: ['OK']
    });

    await alert.present();
  }

}
