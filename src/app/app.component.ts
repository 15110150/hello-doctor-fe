import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hello-doctor';

  constructor(private swUpdate: SwUpdate, private connectionService: ConnectionService ) {

  }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe( next => {
        if (confirm("Đã có phiên bản mới, cập nhật ngay ?")) {
          window.location.reload();
        }
      });
    }
  }
}
