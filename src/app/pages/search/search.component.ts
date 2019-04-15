import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { LocateService } from 'src/app/services/locate/locate.service';
import { SearchResult } from 'src/app/model/searchresult';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  symptom: any;
  currentLat: any;
  currentLong: any;
  searchResult: SearchResult[];
  currentAddress: string;
  partOfDay: string;
  public changeAddress = false;
  public address : any;

  ngOnInit() {
    //set color tab button search 
    var list = document.querySelectorAll('.paoday');
    list[0].classList.add("clicked");
    console.log(list[0]);
    //get MORNING default
    this.getPartOfDate();
    console.log(this.currentAddress);
    if(this.currentAddress == null)
    {
      this.locateLocation();
    }
  }


  constructor(private router: Router, private searchService: SearchService, 
    private locateService: LocateService, private activatedRoute: ActivatedRoute) {
      if (this.activatedRoute.snapshot.params['id']) {
        this.currentAddress = this.activatedRoute.snapshot.params['id'];
        this.changeAddress = true;
      }
  }

  getAddress(currentLat: number, currentLong: number) {
    this.locateService.getAddress(currentLat, currentLong)
      .subscribe(result => {
        this.currentAddress = result.resultAddress;
        console.log(this.currentAddress);
      });
  }

  locateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.getAddress(this.currentLat, this.currentLong);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  searchDoctors() {
    //if(this.changeAddress)
    this.searchService.getListDoctorByAddress(this.symptom, this.currentAddress, this.partOfDay)
    .subscribe(result =>
      {
        this.searchResult = result;
      }
    )
    // this.searchService.getListDoctor(this.symptom, this.currentLat, this.currentLong, this.partOfDay)
    //   .subscribe(result => {
    //     this.searchResult = result;
   
  }

  btnSearch_click() {
    this.searchDoctors();
  }

  chang1(event) {
    var list = document.querySelectorAll('.paoday');
    list.forEach(element => {
      element.classList.remove("clicked");
    })
    event.srcElement.classList.add("clicked");
    this.getPartOfDate();
  }

  getPartOfDate()
  {
    var selected = document.querySelectorAll('.clicked');
    let textInside = selected[0].textContent;
    let morning = 'Sáng';
    let afternoon = 'Trưa';
    if (textInside.trim() === morning)
      this.partOfDay = "MORNING";
    else if (textInside.trim() === afternoon)
      this.partOfDay = "AFTERNOON";
    else
      this.partOfDay = "EVENING";
    console.log(textInside);
    console.log(this.partOfDay);
  }

  btnDoctor_click(id : number) {
    this.router.navigate(['/doctor-profile/doctor', id]);
  }

  btnMap_click()
  {
    this.router.navigate(['/map/address', this.currentAddress]);
   //this.router.navigate(['/map'],{ queryParams: { address: this.currentAddress } });
  }

}
