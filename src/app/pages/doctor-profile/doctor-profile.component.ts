import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  public doctorId : number;
  public doctor : Doctor;

  constructor( private router: Router, private doctorService : DoctorService,
    private activatedRoute : ActivatedRoute, private _location: Location) {
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
        console.log(this.doctor);
      });
  }

  btnBack_click()
  {
    this._location.back();
  }

  btnMap_click()
  {
    this.router.navigate(['/map/address', this.doctor.address]);
  }

  btnBooking_click(id : number) {
    this.router.navigate(['/booking/doctor', id]);
  }
}
