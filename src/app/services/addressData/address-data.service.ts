import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressDataService {
  currentAddress: Subject<string> = new Subject<string>();
  address: string;
  constructor() { 
  
  }


}
