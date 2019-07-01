import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hello-doctor';

  constructor(private swUpdate: SwUpdate, private connectionService: ConnectionService,
    private alertController: AlertController) {

  }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(next => {
        this.notifyAlert();
      });
    }
  }

  async notifyAlert() {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: 'Đã có phiên bản mới, cập nhật ngay ?',
      buttons: [{
        text: 'Xác nhận',
        handler: () => {
          window.location.reload();
        }
      }]
    });
    await alert.present();
  }


}
