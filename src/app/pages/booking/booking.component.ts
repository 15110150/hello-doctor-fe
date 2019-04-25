import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';

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
  currentDate : any;
  maxDateTemp = new Date();
  maxDate : any;
  
  constructor(private datePipe: DatePipe, private _location: Location, 
    private router: Router, private doctorService : DoctorService,
    private activatedRoute : ActivatedRoute){
    if (this.activatedRoute.snapshot.params['id']) {
      this.doctorId = this.activatedRoute.snapshot.params['id'];
    }
      
  }
  ngOnInit() {
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM');
    this.maxDateTemp.setMonth( this.myDate.getMonth() + 1);
    this.maxDate = this.datePipe.transform(this.maxDateTemp, 'yyyy-MM-dd');
    this.getDoctor();
  }

  btnBack_click(){
    this._location.back();
  }

  getDoctor() {
    this.doctorService.getDoctor(this.doctorId)
      .subscribe(result => {
        this.doctor = result;
        console.log(this.doctor);
      });
  }

}
