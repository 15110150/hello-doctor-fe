import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [DatePipe]
})
export class BookingComponent implements OnInit {

  myDate = new Date();
  currentDate : any;
  maxDateTemp = new Date();
  maxDate : any;
  constructor(private datePipe: DatePipe){
      
  }
  ngOnInit() {
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM');
    this.maxDateTemp.setMonth( this.myDate.getMonth() + 1);
    this.maxDate = this.datePipe.transform(this.maxDateTemp, 'yyyy-MM-dd');
    console.log( this.currentDate );
    console.log(this.maxDate); 
  }


}
