import { Component, OnInit } from '@angular/core';
import { DatePipe, Location, Time } from '@angular/common';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/model/booking';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';

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
  maxDateTemp = new Date();
  maxDate: any;
  newBooking: Booking;
  userBooking: Patient;

  monthValue: Array<number>;
  yearValue: Array<number>;

  constructor(private datePipe: DatePipe, private _location: Location,
    private router: Router, private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute, private bookingService: BookingService,
    private userService: PatientService) {
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
    this.monthValue = new Array();
    this.yearValue = new Array();
    this.monthValue.push(today.getMonth());
    this.monthValue.push(today.getMonth() + 1);
    this.yearValue.push(today.getFullYear());

  }

  setDate() {
    this.dateBooking = this.datePipe.transform(this.myDate, 'yyyy-MM');
    this.maxDateTemp.setMonth(this.maxDateTemp.getMonth() + 1);
    this.maxDate = this.datePipe.transform(this.maxDateTemp, 'yyyy-MM');
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

  btnBooking_click() {
    this.newBooking.doctorId = this.doctor.userId;
    this.newBooking.patientId = this.userBooking.userId;
    this.newBooking.commentable = true;
    this.newBooking.status = "WAITING";

    this.timeBooking = this.datePipe.transform(this.bookingTime, 'HH:mm');
    this.dateBooking = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    this.newBooking.dateTime = this.dateBooking + ' ' + this.timeBooking;

    var tempDate = new Date(this.myDate);
    var tempTime = new Date(this.bookingTime);
    var today = new Date();
    if(tempDate.getDate() < today.getDate()){
      alert("Xin quí khách không chọn ngày quá khứ")
    }
    else{
      if(tempDate.getDate() === today.getDate()){
        if(tempTime.getHours() < (today.getHours() + 4)){
          alert("Xin quí khách đặt thời gian cách hiện tại ít nhất 4 giờ")
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
        alert("Bạn đã có lịch hẹn vào thời gian này, vui lòng chọn thời gian khác")
        console.log(this.myDate);
      }
      else {
        this.bookingService.createBooking(this.newBooking)
          .subscribe(result => {
            alert("Bạn đã đặt lịch thành công")
            this.router.navigate(['/main/list-booking']);
          });
      }
    });
  }

}

