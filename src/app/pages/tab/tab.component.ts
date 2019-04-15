import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //var list = document.querySelectorAll('.icon-tab1');
    //list[0].classList.add("clicked1");  
  }

  chang1(event){
    // var list = document.querySelectorAll('.icon-tab1');
    // for(var i = 0 ; i < list.length; i++)
    // {
    //   list[i].classList.remove("clicked1");  
    // }
    // event.target.parentElement.classList.add("clicked1");
    // event.srcElement.classList.add("clicked1");
   }
}
