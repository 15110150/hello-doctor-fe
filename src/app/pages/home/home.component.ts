import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavController, PopoverController, IonTabs, DomController, AlertController } from "@ionic/angular";
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';
import { IdbService } from 'src/app/services/index-DB/index-db.service';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  sliderConfig = {
    slidesPerView: 1.4,
    spaceBetween: 10
  };
  user: Patient;
  partOfDay;
  refesh;
  isReload;
  isShow = true;

  navigationSubscription
  constructor(public nav: NavController, public popoverCtrl: PopoverController,
    public router: Router, private domCtrl: DomController, private route: ActivatedRoute,
    private patientService: PatientService, private indexDBService: IdbService,
    public alertController: AlertController) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getProfile();
      }
    });
  }

  ngOnInit(): void {
    this.isReload = true;
    this.getPartOfDate();
    this.user = new Patient();
    this.getProfile();
  }

  doRefresh(event) {
    this.refesh = event;
    this.getPartOfDate();
    this.getProfile();
  }

  getPartOfDate() {
    var today = new Date();
    var hour = today.getHours();
    if (hour >= 0 && hour < 11) {
      this.partOfDay = "Chào buổi sáng"
    }
    else if (hour >= 11 && hour < 14) {
      this.partOfDay = "Chúc buổi trưa mát mẻ"
    }
    else if (hour >= 14 && hour < 18) {
      this.partOfDay = "Chúc buổi chiều vui khỏe"
    }
    else if (hour >= 18 && hour < 24) {
      this.partOfDay = "Chúc buổi tối tốt lành"
    }
  }

  getProfile() {
    this.patientService.getUser()
      .subscribe(result => {
        //kết thúc refesh
        if (this.refesh != undefined) {
          this.refesh.target.complete();
        }
        this.user = result;
      },
        error => {
          //show thông báo offline trong lần đầu tiên 
          if(this.isShow === true){
            this.mesageAlert();
          }
          //sau đó không show nữa
          this.isShow = false;
          //kết thúc reshe
          if (this.refesh != undefined) {
            this.refesh.target.complete();
          }
          //sau đó lấy thông tin người dùng từ indexDB
          this.indexDBService.getUser()
            .subscribe(result => {
              this.user = result[0];
            });
        }

      );
  }

  // go to result page
  cdSearch_click() {
    this.router.navigateByUrl('/main/search/search');
  }
  cdListBooking_click() {
    this.router.navigateByUrl('/main/list-booking');
  }
  cdAccount_click() {
    this.router.navigateByUrl('/profile');
  }

  btnPromotion_click(){
    this.router.navigateByUrl('/promotion');
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  async mesageAlert() {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: 'Có vẻ như bạn đang offline, vui lòng kết nối internet để cập nhật thông tin mới nhất. Trong trường hợp bạn không thể online ngay lúc này, chúng tối sẽ hiển thị thông tin cá nhân của bạn và danh sach các lịch khám mà bạn đã hoàn thành để bạn có thể coi lại sổ khám của mình',
      buttons: ['OK']
    });

    await alert.present();
  }
}
