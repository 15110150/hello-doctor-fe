import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController, IonTabs, DomController } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sliderConfig = {
    slidesPerView: 1.4,
    spaceBetween: 10
  };
  user: Patient;

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.patientService.getUser() 
    .subscribe(result => {
      this.user = result;
    });
  }

  constructor(public nav: NavController, public popoverCtrl: PopoverController,
    public router: Router, private domCtrl: DomController, private route: ActivatedRoute, 
    private patientService: PatientService) {
  }

  // go to result page
  searchDoctors() {
    this.router.navigateByUrl('/search/search');
  }

}
