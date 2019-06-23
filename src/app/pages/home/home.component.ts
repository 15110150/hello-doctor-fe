import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController, IonTabs, DomController } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Patient } from 'src/app/model/patient';
import { IdbService } from 'src/app/services/index-DB/index-db.service';

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
  partOfDay;
  
  constructor(public nav: NavController, public popoverCtrl: PopoverController,
    public router: Router, private domCtrl: DomController, private route: ActivatedRoute, 
    private patientService: PatientService, private indexDBService: IdbService) {
  }

  ngOnInit(): void {
    this.getPartOfDate();
    this.user = new Patient();
    if (!navigator.onLine){
      console.log(navigator.onLine);
      this.user = this.indexDBService.getUser();
    }
    else{
      console.log(navigator.onLine);
      this.getProfile();
    }
  }

  getPartOfDate(){
    var today = new Date();
    var hour = today.getHours();
    if(hour >= 0 && hour < 11){
      this.partOfDay = "Chào buổi sáng"
    }
    else if(hour >= 11 && hour < 14){
      this.partOfDay = "Chúc buổi trưa mát mẻ"
    }
    else if(hour >= 14 && hour < 18){
      this.partOfDay = "Chúc buổi chiều bui khỏe"
    }
    else if(hour >= 18 && hour < 24){
      this.partOfDay = "Chúc buổi tối tốt lành"
    }
  }

  getProfile(){
       this.patientService.getUser()
      .subscribe(result => {
        if (result != null) {
          this.user = result;
        }
      },
        error => {
          this.user = this.indexDBService.getUser();
        }

      );
  }

  // go to result page
  cdSearch_click() {
    this.router.navigateByUrl('/main/search/search');
  }
  cdListBooking_click(){
    this.router.navigateByUrl('/main/list-booking');
  }
  cdAccount_click(){
    this.router.navigateByUrl('/test');
  }

}
