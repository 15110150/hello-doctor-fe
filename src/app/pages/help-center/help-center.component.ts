import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.sass']
})
export class HelpCenterComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  btnBack_click(){
    this._location.back();
  }

}
