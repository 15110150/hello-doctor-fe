import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { MailBoxService } from 'src/app/services/mail-box/mail-box.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  @ViewChild('myTabs') tabs: IonTabs;

  numberMail;

  constructor(private mailboxService: MailBoxService, private patientService: PatientService) { }

  ngOnInit() {
    //var list = document.querySelectorAll('.icon-tab1');
    //list[0].classList.add("clicked1");  
  }

  chang1(event) {
  }

  ionChange(myTabs) {
    // console.log(this.tabs.getSelected());
  }

  // countMail(){
  //   this.patientService.getUser()
  //   .subscribe(result => {
  //     if (result != null) {
  //       this.mailboxService.getAllMail(result.userId)
  //       .subscribe(result =>{
  //         this.numberMail = result.filter(x=>{
  //           x.read = false;
  //         })
  //       })
  //     }
  //   },
  //     error => {

  //     }

  //   );
  // }
}
