import { Component, OnInit } from '@angular/core';
import { DatePipe, Location, Time } from '@angular/common';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/model/booking';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [DatePipe]
})
export class BookingComponent implements OnInit {

  doctorId: number;
  doctor: Doctor;
  myDate = new Date().toISOString();
  bookingTime = new Date("2019-01-01T07:00:00").toISOString();
  dateBooking: any;
  timeBooking: any;
  minDate: any;
  newBooking: Booking;
  userBooking: Patient;

  monthValue: Array<number>;
  yearValue: Array<number>;

  constructor(private datePipe: DatePipe, private _location: Location,
    private router: Router, private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute, private bookingService: BookingService,
    private userService: PatientService, public alertController: AlertController) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.doctorId = this.activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {
    this.initTime();
    this.setDate();
    this.getDoctor();
    this.newBooking = new Booking();
    this.getUser();
  }

  initTime() {
    var today = new Date();
    console.log(today);
    this.monthValue = new Array();
    this.yearValue = new Array();
    this.monthValue.push(today.getMonth() + 1);
    this.monthValue.push(today.getMonth() + 2);
    this.yearValue.push(today.getFullYear());
  }

  setDate() {
    this.dateBooking = this.datePipe.transform(this.myDate, 'yyyy-MM');
    var today = new Date();
    this.minDate = this.datePipe.transform(today, 'yyyy-MM-dd');
  }

  btnBack_click() {
    this._location.back();
  }

  getUser() {
    this.userService.getUser()
      .subscribe(result => {
        this.userBooking = result;
      });
  }

  getDoctor() {
    this.doctorService.getDoctor(this.doctorId)
      .subscribe(result => {
        this.doctor = result;
        console.log(this.doctor);
      });
  }

  timeToMinutes(time) {
    var hours = (new Date(time)).getHours() * 60;
    var minutes = (new Date(time)).getMinutes() ;
    time = hours + minutes;
    console.log(time);
    return time;
}

  btnBooking_click() {
    this.newBooking.doctorId = this.doctor.userId;
    this.newBooking.patientId = this.userBooking.userId;
    this.newBooking.commentable = true;
    this.newBooking.status = "WAITING";

    this.timeBooking = this.datePipe.transform(this.bookingTime, 'HH:mm');
    this.dateBooking = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    this.newBooking.dateTime = this.dateBooking + ' ' + this.timeBooking;

    var tempDate = new Date(this.myDate);
    var tempTime = this.timeToMinutes(this.bookingTime);
    var today = new Date();
    var minuteNow = this.timeToMinutes(today);
    
    if(tempDate.getDate() < today.getDate()){
      this.pastDateAlert();
    }
    else{
      if(tempDate.getDate() === today.getDate()){
        if(tempTime < minuteNow + 30){
          console.log(tempTime);
          console.log(minuteNow);
          this.minuteAlert();
        }
        else{
          this.createBooking();
        }
      }
      else{
        this.createBooking();
      }
    }

   
  }

  createBooking(){
    this.bookingService.getListBookingAtTime(this.newBooking.dateTime + ":00")
    .subscribe(result => {
      if (result.length != 0) {
        this.sameDateAlert();
      }
      else {
        this.bookingService.createBooking(this.newBooking)
          .subscribe(result => {
            this.successAlert();
            this.router.navigate(['/main/list-booking']);
          });
      }
    });
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Đặt lịch thành công',
      message: 'Vui lòng đến trước thời gian hẹn 5p để việc khám bệnh diễn ra thuận lợi. Xin cảm ơn!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async sameDateAlert() {
    const alert = await this.alertController.create({
      header: 'Đặt lịch không thành công',
      message: 'Bạn đã có lịch hẹn vào thời gian này, vui lòng chọn thời gian khác. Xin cảm ơn!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async pastDateAlert() {
    const alert = await this.alertController.create({
      header: 'Đặt lịch không thành công',
      message: 'Xin quí khách không chọn ngày quá khứ. Xin cảm ơn!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async minuteAlert() {
    const alert = await this.alertController.create({
      header: 'Đặt lịch không thành công',
      message: 'Xin quí khách chọn thời gian cách hiện tại ít nhất 30 phút Xin cảm ơn!',
      buttons: ['OK']
    });
    await alert.present();
  }
}

