import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { LocateService } from 'src/app/services/locate/locate.service';
import { SearchResult } from 'src/app/model/searchresult';
import { Address } from 'src/app/model/address';
import { AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { CompleteService } from 'src/app/services/auto-complete/auto-complete.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myForm: FormGroup;
  symptom: any;
  listSymptom;
  currentLat: any;
  currentLong: any;
  searchResult: SearchResult[];
  currentAddress: string;
  //partOfDay: string;
  public changeAddress = false;
  public address: any;
  // isMorn = true;
  // isAfter = false;
  // isEven = false;
  isShow = false;
  status = "off";
  showList = false;
  isSearch: boolean;
  refesh;

  ngOnInit() {
    this.myForm = new FormGroup({
      symptomS: new FormControl()
    });
    if (this.currentAddress == null) {
      this.locateLocation();
    }
  }

  doRefresh(event) {
    this.refesh = event;
    this.locateLocation();
  }

  submit(): void {
    this.showList = false;
    this.searchDoctors();
  }

  constructor(private router: Router, private searchService: SearchService,
    private locateService: LocateService, private activatedRoute: ActivatedRoute,
    public alertController: AlertController, public completeTestService: CompleteService) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.currentAddress = this.activatedRoute.snapshot.params['id'];
      this.changeAddress = true;
    }
  }

  search(event) {
    this.showList = true;
    this.completeTestService.getResults(event.target.value)
      .subscribe(result => {
        console.log(result);
        this.listSymptom = result;
      });
  }

  addNote(symptom) {
    this.symptom = symptom;
    this.submit();
  }

  // btnMorn_click() {
  //   this.isMorn = true;
  //   this.isEven = !this.isMorn;
  //   this.isAfter = !this.isMorn;
  //   this.partOfDay = "MORNING";

  // }

  // btnAfter_click() {
  //   this.isAfter = true;
  //   this.isEven = !this.isAfter;
  //   this.isMorn = !this.isAfter;
  //   this.partOfDay = "AFTERNOON";
  // }

  // btnEvent_click() {
  //   this.isEven = true;
  //   this.isAfter = !this.isEven;
  //   this.isMorn = !this.isEven;
  //   this.partOfDay = "EVENING";
  // }

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
        this.isSearch = true;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.getAddress(this.currentLat, this.currentLong);
      },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.errorDeniedAlert();
              this.isSearch = false;
              break;
            case error.POSITION_UNAVAILABLE:
              this.unvailAlert();
              this.isSearch = false;
              break;
            case error.TIMEOUT:
              this.timeoutAlert();
              this.isSearch = false;
              break;
          }
        });
      if (this.refesh != undefined) {
        this.refesh.target.complete();
      }
    } else {
      this.isSearch = false;
      this.geocordingAlert();
      if (this.refesh != undefined) {
        this.refesh.target.complete();
      }
    }
  }

  symptomChange(event) {
    this.symptom = event;
    this.searchDoctors();
    this.completeTestService = null;
  }

  searchDoctors() {
    if (this.currentAddress != null || this.currentAddress != undefined) {
      this.isShow = true;
      this.searchResult = null;
      //this.searchService.getListDoctorByAddress(this.currentAddress, this.partOfDay, this.symptom)
      this.searchService.getListDoctorByAddress(this.currentAddress, this.symptom)
        .subscribe(result => {
          this.searchResult = result;
          this.isShow = false;
          // this.searchResult.forEach(x=>
          //   x.basePrice = parseFloat(x.basePrice).toFixed(3));
        },
          error => {
            this.errorAlert();
            this.isShow = false;
          }
        )
      // this.searchService.getListDoctor(this.symptom, this.currentLat, this.currentLong, this.partOfDay)
      //   .subscribe(result => {
      //     this.searchResult = result;
    }
    else {
      this.checkGeoAlert();
    }
  }

  btnDoctor_click(id: number) {
    this.router.navigate(['/doctor-profile/doctor', id]);
  }

  btnMap_click() {
    if (this.currentAddress === undefined || this.currentAddress === null) {
      this.router.navigate(['/map/address', "search", "center"]);
    }
    this.router.navigate(['/map/address', "search", this.currentAddress]);
    //this.router.navigate(['/map'],{ queryParams: { address: this.currentAddress } });
  }

  async geocordingAlert() {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: 'Định vị không hỗ trợ cho trình duyệt này.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Lỗi',
      message: 'Vui lòng kiểm tra kết nối internet. Nếu đã kết nối mà không tìm kiếm được, vui lòng liên hệ quản trị viên.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorDeniedAlert() {
    const alert = await this.alertController.create({
      message: 'Vui lòng bật định vị hoặc chọn vị trí để sử dụng dịch vụ.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //this.locateLocation();
          }
        }
      ]
    });

    await alert.present();
  }

  async unvailAlert() {
    const alert = await this.alertController.create({
      header: 'Lỗi',
      message: 'Thông tin vị trí không có sẵn.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async checkGeoAlert() {
    const alert = await this.alertController.create({
      header: 'Lỗi',
      message: 'Vui lòng kiểm tra định vị hoặc chọn vị trí để sử dụng dịch vụ.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async timeoutAlert() {
    const alert = await this.alertController.create({
      header: 'Lỗi',
      message: 'Yêu cầu nhận được vị trí người dùng đã hết thời gian. Vui lòng thử lại',
      buttons: ['OK']
    });

    await alert.present();
  }
}