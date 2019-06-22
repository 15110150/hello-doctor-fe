import {Injectable} from '@angular/core';
import * as idb from 'idb';
import {Observable, Subject} from 'rxjs';
import {ListBooking} from '../../model/list-booking';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
private _dataChange: Subject<ListBooking> = new Subject<ListBooking>();
private _dbPromise;

constructor() {
}

connectToIDB() {
  this._dbPromise = idb.openDB('pwa-database', 1);
}

addItems(target: string, value: ListBooking) {
  this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readwrite');
    tx.objectStore(target).put({
    dateTime: value.dateTime,
    dateFormat: value.dateFormat,
    id: value.id,
    doctor: value.doctor,
    patient: value.patient,
    status: value.status,
    statusReason: value.statusReason
  });
  this.getAllData('ListBookings').then((items: ListBooking) => {
    this._dataChange.next(items);
  });
    return tx.complete;
  });
}

deleteItems(target: string, value: ListBooking) {
  this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readwrite');
    const store = tx.objectStore(target);
    store.delete(value);
    this.getAllData(target).then((items: ListBooking) => {
      this._dataChange.next(items);
    });
  return tx.complete;
  });
}

getAllData(target: string) {
  return this._dbPromise.then((db: any) => {
    const tx = db.transaction(target, 'readonly');
    const store = tx.objectStore(target);
    return store.getAll();
  });
}

dataChanged(): Observable<ListBooking> {
    return this._dataChange;
  }
  }