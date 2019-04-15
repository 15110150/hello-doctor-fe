import {Component, OnInit} from "@angular/core";
import {NavController, PopoverController, IonTabs, DomController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 // search condition
 public search = {
  name: "Rio de Janeiro, Brazil",
  date: new Date().toISOString()
}
ngOnInit()
{
  console.log("home hi");
}

constructor(public nav: NavController, public popoverCtrl: PopoverController,
   public router: Router, private domCtrl: DomController) {
}

// go to result page
searchDoctors() {
  this.router.navigateByUrl('/search/search');
}


private adjustElementOnScroll(ev) {
  if (ev) {
      this.domCtrl.write(() => {
          // ...
      });
  }
}

}
