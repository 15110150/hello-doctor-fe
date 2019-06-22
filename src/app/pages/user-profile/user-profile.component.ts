import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userProfile: Patient;
  isEdit = true;
  selectedFile = null;
  public message: string;
  public imagePath;

  @ViewChild('myFile', { read: ElementRef }) fileElementRef: ElementRef;

  constructor(private patientService: PatientService, private _location: Location,
    public alertController: AlertController, private uploadFileService: UploadFileService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.patientService.getUser()
      .subscribe(result => {
        this.userProfile = result;
        console.log(this.userProfile);
      });
  }

  btnBack_click() {
    this._location.back();
  }

  btnEdit_click() {
    this.isEdit = false;
    console.log(this.isEdit);
  }

  btnSave_click(userProfile: Patient) {
    this.patientService.updateUser(userProfile)
      .subscribe(result => {
        if (result != null) {
          this.successAlert();
          this.getProfile();
        }
        error => {
          this.errorAlert();
        }
      })
    this.isEdit = true;
  }

  getImage() {
    console.log(this.fileElementRef);
    this.fileElementRef.nativeElement.click();
  }

  onFileSelected(event) {
    console.log(event);
    if (event.target.files.length === 0)
      return;

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    let file: File = event.target.files[0];
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new Headers();
    
    this.uploadFileService.updateFile(formData)
    .subscribe(result => {
      if (result != null) {
       this.userProfile.avatarImg = result;
      }
      error => {
        this.errorAlert();
      }
    })
  }

  // uploadFile(){
  //   this.uploadFileService.updateFile(formData)
  //   .subscribe(result => {
  //     if (result != null) {
  //      this.userProfile.avatarImg = result;
  //     }
  //     error => {
  //       this.errorAlert();
  //     }
  //   })
  // }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Cập nhật hồ sơ thành công',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Lỗi',
      message: 'Cập nhật hồ sơ thất bại, vui lòng liên hệ với quan trị viên',
      buttons: ['OK']
    });

    await alert.present();
  }

}
