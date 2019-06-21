import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { ListBooking } from 'src/app/model/list-booking';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Booking } from 'src/app/model/booking';
import { MappingModelService } from 'src/app/services/mapping-model/mapping-model.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss']
})
export class ListBookingComponent implements OnInit, OnDestroy {

  public isShow = false;
  public listwaiting = true;
  public listdone = false;
  public listcancel = false;
  public status: any;
  public listBoooking: ListBooking[];
  navigationSubscription;

  constructor(private bookingService: BookingService, private router: Router,
    public alertController: AlertController, private mappingService: MappingModelService) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd && this.status != null) {
        console.log("reload");
        this.getListBooking(this.status);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

  segmentChanged(ev: any) {
    this.isShow = true;
    this.listBoooking = null;
    if (ev.detail.value === "waiting") {
      this.listwaiting = true;
      this.listdone = false;
      this.listcancel = false;
      this.status = Status.WAITING + ',' + Status.ACCEPTED;
    }
    else if (ev.detail.value === "done") {
      this.listwaiting = false;
      this.listdone = true;
      this.listcancel = false;
      this.status = Status.FINISHED;
    }
    else if (ev.detail.value === "cancel") {
      this.listwaiting = false;
      this.listdone = false;
      this.listcancel = true;
      this.status = Status.DOCTOR_CANCEL + ',' + Status.PATIENT_CANCEL + ',' + Status.EXPIRED;
    }
    this.getListBooking(this.status);
  }

  getListBooking(status: any) {
    this.bookingService.getListBooking(status)
      .subscribe(
        result => {
          this.listBoooking = result;
          this.listBoooking.forEach(x=>{
            x.dateFormat = this.getDay(x.dateTime);
          })
        }
      )
      
  }

  btnFeedback_click(doctorid: number, bookid: number){
    this.router.navigate(['/feedback/feedback', doctorid, bookid]);
  }

  btnDetail_click(bookId: number){
    this.router.navigate(['/health-record/record/', bookId]);
  }

  btnCancel_click(booking: any){
   this.confirmAlert(booking);
  }

  btnDoctor_click(id: number) {
    this.router.navigate(['/doctor-profile/doctor', id]);
  }

  getDay(date: string) {
    var weekday = new Array(7);
    weekday[0] = "Chủ nhật";
    weekday[1] = "Thứ 2";
    weekday[2] = "Thứ 3";
    weekday[3] = "Thứ 4";
    weekday[4] = "Thứ 5";
    weekday[5] = "Thứ 6";
    weekday[6] = "Thứ 7";

    //date format là dd/mm/YYYY HH:mm nên cắt lấy dd/mm/YYYY phần đầu trước dấu cách
    var dateString = date.substr(0, date.indexOf(' '));
    var dateParts = dateString.split("/");

    var dateObject: Date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return weekday[dateObject.getDay()] + ", " + date;
  }

  async cancelBookingAlert() {
    const alert = await this.alertController.create({
      header: 'Hủy lịch thành công',
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmAlert(booking) {
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      message: 'Quí khách có chắc hủy lịch hẹn này không!!!',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Xác nhận',
          handler: () => {
          this.reasonAlert(booking);
          }
        }
      ]
    });

    await alert.present();
  }

  async reasonAlert(booking) {
    const alert = await this.alertController.create({
      header: 'Lí do hủy',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Tôi có việc đột xuất',
          value: 'Tôi có việc đột xuất',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Phòng khám đóng cửa',
          value: 'Phòng khám đóng cửa'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Lý do khác',
          value: 'Lý do khác'
        }
      ],
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Xác nhận',
          handler: (data: string) => {
              booking.status = Status.PATIENT_CANCEL;
              booking.statusReason = data;
              var bookingDTO = new Booking();
              this.mappingService.mapingBooking(bookingDTO, booking);
              this.bookingService.updateBooking(bookingDTO)
            .subscribe(result=> {
              this.cancelBookingAlert();
              this.getListBooking(Status.WAITING + ',' + Status.ACCEPTED);
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
export enum Status {
  WAITING = "WAITING",
  PATIENT_CANCEL = "PATIENT_CANCEL",
  DOCTOR_CANCEL = "DOCTOR_CANCEL",
  EXPIRED = "EXPIRED",
  ACCEPTED = "ACCEPTED",
  FINISHED = "FINISHED",
}
