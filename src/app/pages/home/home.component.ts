import {Component, OnInit} from "@angular/core";
import {NavController, PopoverController, IonTabs, DomController } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
ngOnInit(): void {
}

constructor(public nav: NavController, public popoverCtrl: PopoverController,
   public router: Router, private domCtrl: DomController, private route: ActivatedRoute) {
}

// go to result page
searchDoctors() {
  this.router.navigateByUrl('/search/search');
}

}
