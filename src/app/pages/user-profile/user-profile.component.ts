import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';
import { Location } from '@angular/common';
import { AlertController, LoadingController } from '@ionic/angular';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { IdbService } from 'src/app/services/index-DB/index-db.service';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { NgxIndexedDB } from 'ngx-indexed-db';

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
  online$;
  loading;

  //kiểm tra có đang kết nối internet
  isOnline;

  @ViewChild('myFile', { read: ElementRef }) fileElementRef: ElementRef;

  constructor(private patientService: PatientService, private _location: Location,
    public alertController: AlertController, private uploadFileService: UploadFileService,
    private indexDBService: IdbService, private loadingController: LoadingController) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
  }


  ngOnInit() {
    this.userProfile = new Patient();
    this.getProfile();
  }

  getProfile() {
    this.patientService.getUser()
      .subscribe(result => {
        if (result != undefined) {
          this.isOnline = true;
          this.userProfile = result;
          console.log(this.userProfile);
          this.indexDBService.getUser().subscribe(data => {
            if (data === undefined || data.length <= 0) {
              this.indexDBService.connecttoDBUser(this.userProfile);
            }
            else {
              this.indexDBService.updateUser(this.userProfile);
            }
          })
        }
      },
        error => {
          this.isOnline = false;
          this.indexDBService.getUser()
            .subscribe(result => {
              this.userProfile = result[0];
              console.log(this.userProfile)
            });
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
    console.log(event.target.files[0]);
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    let file: File = event.target.files[0];
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    let headers = new Headers();

    this.presentLoading();

    this.uploadFileService.updateFile(formData)
      .subscribe(result => {
        this.loading.dismiss();
        if (result != null) {
          this.userProfile.avatarImg = result.url;
        }
        error => {
          this.errorAlert();
        }
      })
  }

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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Đang tải hình'
    });
    await this.loading.present();
  }

}
