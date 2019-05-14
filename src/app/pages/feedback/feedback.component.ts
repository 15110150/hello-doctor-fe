import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Doctor } from 'src/app/model/doctor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  doctorId: number;
  doctor: Doctor;
  rateSumary: number;
  isSelected1 = false;
  isSelected2 = false;
  isSelected3 = false;
  isSelected4 = false;
  isSelected5 = false;

  constructor(private router: Router, private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute, private _location: Location) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.doctorId = this.activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {
    this.getDoctor();
  }

  getDoctor() {
    this.doctorService.getDoctor(this.doctorId)
      .subscribe(result => {
        this.doctor = result;
      });
  }

  //thay đổi màu của các icon star
  changeState(val1, val2, val3, val4, val5 ){
    this.isSelected1 = val1;
    this.isSelected2 = val2;
    this.isSelected3 = val3;
    this.isSelected4 = val4;
    this.isSelected5 = val5;
  }

  btnstar1_click() {
    this.rateSumary = 1;
    this.changeState(true, false, false, false, false);
  }

  btnstar2_click() {
    this.rateSumary = 2;
    this.changeState(true, true, false, false, false);
  }

  btnstar3_click() {
    this.rateSumary = 3;
    this.changeState(true, true, true, false, false);
  }

  btnstar4_click() {
    this.rateSumary = 4;
    this.changeState(true, true, true, true, false);
  }

  btnstar5_click() {
    this.rateSumary = 5;
    this.changeState(true, true, true, true, true);
  }

}
