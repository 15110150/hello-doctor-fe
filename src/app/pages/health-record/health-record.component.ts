import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { HealthRecord } from 'src/app/model/health-record';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking/booking.service';
import { ListBooking } from 'src/app/model/list-booking';
import { HealthRecordDTO } from 'src/app/model/health-record-DTO';

@Component({
  selector: 'app-health-record',
  templateUrl: './health-record.component.html',
  styleUrls: ['./health-record.component.scss']
})
export class HealthRecordComponent implements OnInit {

  selectedFile = null;
  message: string;
  imagePath;
  healthRecord: HealthRecordDTO;
  bookId;
  // booking: ListBooking;
  isEdit = false;
  healthRecordSave: HealthRecord;
  loading;

  constructor(private _location: Location, private modalController: ModalController,
    private uploadFileService: UploadFileService, private alertController: AlertController,
    private activatedRoute: ActivatedRoute, private bookingService: BookingService,
    private loadingController: LoadingController) {
    if (this.activatedRoute.snapshot.params['bookId']) {
      this.bookId = this.activatedRoute.snapshot.params['bookId'];
    }
  }

  ngOnInit() {
    this.healthRecord = new HealthRecordDTO();
    this.getHealthRecord();
  }

  btnBack_click() {
    this._location.back();
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
        this.selectedFile = result.url;
      },
        error => {
          this.errorImgAlert();
        }
      )
  }

  openPreview(img) {
    this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }

  btnSave_click(healthRecord: any) {
    this.healthRecordSave = new HealthRecord();
    this.healthRecordSave.bookId = healthRecord.bookId;
    this.healthRecordSave.userId = healthRecord.patient.userId;
    this.healthRecordSave.content = healthRecord.content;
    this.healthRecordSave.prescriptionImage = this.selectedFile;
    console.log(this.healthRecordSave);
    this.bookingService.createHealthRecord(this.healthRecordSave)
      .subscribe(result => {
        if (result != null) {
          this.successAlert();
          this.getHealthRecord();
        }
      },
        error => {
          this.errorAlert();
        })
    this.isEdit = false;
  }

  btnEdit_click() {
    this.isEdit = true;
  }

  getHealthRecord() {
    this.bookingService.getHealthRecord(this.bookId)
      .subscribe(result => {
        this.healthRecord = result;
        this.selectedFile = this.healthRecord.prescriptionImage;
      });
  }

  async errorImgAlert() {
    const alert = await this.alertController.create({
      header: 'Lỗi',
      message: 'Tải hình thất bại, vui lòng liên hệ với quan trị viên',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Cập nhật sổ khám thành công',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Lỗi',
      message: 'Cập nhật sổ khám thất bại, vui lòng liên hệ với quan trị viên',
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
