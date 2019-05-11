import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { ListBooking } from 'src/app/model/list-booking';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';

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

  constructor(private bookingService: BookingService, private router: Router) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getListBooking(Status.WAITING + ',' + Status.ACCEPTED);
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
        }
      )
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
