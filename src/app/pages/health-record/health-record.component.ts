import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-health-record',
  templateUrl: './health-record.component.html',
  styleUrls: ['./health-record.component.scss']
})
export class HealthRecordComponent implements OnInit {

  selectedFile = null;
  public message: string;
  public imagePath;

  constructor(private _location: Location, private modalController: ModalController) { }

  ngOnInit() {
  }

  btnBack_click() {
    this._location.back();
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
 
    var reader = new FileReader();
    this.imagePath = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.selectedFile = reader.result; 
    }
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
}
