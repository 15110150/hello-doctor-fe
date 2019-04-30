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
  myDate = new Date();
  bokingTime: string;
  currentDate: any;
  maxDateTemp = new Date();
  maxDate: any;
  newBooking: Booking;
  userBooking: Patient;

  constructor(private datePipe: DatePipe, private _location: Location,
    private router: Router, private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute, private bookingService: BookingService,
    private userService: PatientService) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.doctorId = this.activatedRoute.snapshot.params['id'];
    }

  }
  ngOnInit() {
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM');
    this.maxDateTemp.setMonth(this.myDate.getMonth() + 1);
    this.maxDate = this.datePipe.transform(this.maxDateTemp, 'yyyy-MM');
    this.newBooking = new Booking();
    this.getDoctor();
    this.getUser();
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
    this.myDate = new Date();
    this.newBooking.doctorId = this.doctor.userId;
    this.newBooking.patientId = this.userBooking.userId;

    this.newBooking.commentable = true;
    this.newBooking.status = "WAITING";

    this.bokingTime = this.datePipe.transform(this.bokingTime, 'hh:mm');
    this.currentDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    this.newBooking.dateTime = this.currentDate + ' ' + this.bokingTime;



    this.bookingService.createBooking(this.newBooking)
      .subscribe(result => {
        alert("Bạn đã đặt lịch")
        this.router.navigateByUrl('/main/list-booking');
      });
  }

}

