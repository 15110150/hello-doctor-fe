import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss']
})
export class ListBookingComponent implements OnInit {
  
  public isShow = false;
  constructor() { }

  ngOnInit() {
  }

}
