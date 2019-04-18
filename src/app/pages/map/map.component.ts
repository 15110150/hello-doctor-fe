import { Component, OnInit, ViewChild, Directive, ElementRef, NgZone, Input } from '@angular/core';
import { } from 'googlemaps';
import { LocateService } from 'src/app/services/locate/locate.service';
import { AddressDataService } from 'src/app/services/addressData/address-data.service';
import { google } from "google-maps";
import { MapsAPILoader } from '@agm/core';
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { PreviousRouteService } from 'src/app/services/previous-route/previous-route.service';
import { Location } from '@angular/common';

declare var google: google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

  public map: google.maps.Map;
  public zoom: number;
  public previousURL: any;
  currentLat: any;
  currentLong: any;
  address: any;
  marker: google.maps.Marker;
  currentAddress: string;
  public isReadOnly = false;


  @ViewChild("searchInput")
  public searchElementRef: ElementRef;

  constructor(private locateService: LocateService, private elRef: ElementRef, private addressData: AddressDataService,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private activatedRoute: ActivatedRoute,
    private router: Router, private previousRouteService: PreviousRouteService, private _location: Location) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.currentAddress = this.activatedRoute.snapshot.params['id'];
    }
  }

  getAddress(currentLat: number, currentLong: number) {
    this.locateService.getAddress(currentLat, currentLong)
      .subscribe(result => {
        this.currentAddress = result.resultAddress;
      });
    let location = new google.maps.LatLng(currentLat, currentLong);
    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  locateLocation() {
    this.locateService.getCoordinate(this.currentAddress)
      .subscribe(result => {
        this.currentLat = result.lat;
        this.currentLong = result.lng;
      });
    let location = new google.maps.LatLng(this.currentLat, this.currentLong);
    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
  btnBack_click() {
    if (this.previousURL.includes("doctor-profile")) {
      this._location.back();
    }
    else
    {
      this.router.navigate(['/main/search/search', this.currentAddress]);
    }
  }

  ngOnInit() {
    this.previousURL = this.previousRouteService.getPreviousUrl();
    if (this.previousURL.includes("doctor-profile")) {
      this.isReadOnly = true;
    }
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: { country: "vn" }
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.currentAddress = place.formatted_address;
          //set latitude, longitude and zoom
          this.currentLat = place.geometry.location.lat();
          this.currentLong = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.locateLocation();
  }
}
