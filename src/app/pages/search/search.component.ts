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
export class SearchComponent implements OnInit {

  symptom: any;
  currentLat: any;
  currentLong: any;
  searchResult: SearchResult[];
  currentAddress: string;
  partOfDay: string;
  public changeAddress = false;
  public address: any;
  isMorn = true;
  isAfter = false;
  isEven = false;
  isShow = false;

  ngOnInit() {
    if (this.currentAddress == null) {
      this.locateLocation();
    }
    this.partOfDay = "MORNING";
  }

  constructor(private router: Router, private searchService: SearchService,
    private locateService: LocateService, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.currentAddress = this.activatedRoute.snapshot.params['id'];
      this.changeAddress = true;
    }
  }

  btnMorn_click() {
    this.isMorn = true;
    this.isEven = !this.isMorn;
    this.isAfter = !this.isMorn;
    this.partOfDay = "MORNING";

  }

  btnAfter_click() {
    this.isAfter = true;
    this.isEven = !this.isAfter;
    this.isMorn = !this.isAfter;
    this.partOfDay = "AFTERNOON";
  }

  btnEvent_click() {
    this.isEven = true;
    this.isAfter = !this.isEven;
    this.isMorn = !this.isEven;
    this.partOfDay = "EVENING";
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
    this.isShow = true;
    this.currentAddress = "484 Lê Văn Việt, phường Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh";
    this.searchService.getListDoctorByAddress(this.currentAddress, this.partOfDay, this.symptom)
      .subscribe(result => {
        this.searchResult = result;
        // this.searchResult.forEach(x=>
        //   x.basePrice = parseFloat(x.basePrice).toFixed(3));
      }
      )
    // this.searchService.getListDoctor(this.symptom, this.currentLat, this.currentLong, this.partOfDay)
    //   .subscribe(result => {
    //     this.searchResult = result;
  }

  btnSearch_click() {
    this.searchDoctors();
  }

  btnDoctor_click(id: number) {
    this.router.navigate(['/doctor-profile/doctor', id]);
  }

  btnMap_click() {
    this.router.navigate(['/map/address', this.currentAddress]);
    //this.router.navigate(['/map'],{ queryParams: { address: this.currentAddress } });
  }

}