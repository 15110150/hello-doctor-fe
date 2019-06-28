import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { ListBooking } from '../../model/list-booking';
import { Patient } from 'src/app/model/patient';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { HealthRecord } from 'src/app/model/health-record';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  userPro: Patient;
  private db: NgxIndexedDB;

  constructor() {
    this.db = new NgxIndexedDB('myDb', 1);
    this.db.openDatabase(1, evt => {
      let objectStore = evt.currentTarget.result.createObjectStore('user', { keyPath: 'userId', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('personIdNumber', 'personIdNumber', { unique: false });
      objectStore.createIndex('phoneNumber', 'phoneNumber', { unique: false });
      objectStore.createIndex('weight', 'weight', { unique: false });
      objectStore.createIndex('height', 'height', { unique: false });
      objectStore.createIndex('email', 'email', { unique: false });
      objectStore.createIndex('avatarImg', 'avatarImg', { unique: false });
      objectStore.createIndex('dateOfBirth', 'dateOfBirth', { unique: false });
      objectStore.createIndex('description', 'description', { unique: false });
      objectStore.createIndex('gender', 'gender', { unique: false });
    })
    // this.db.openDatabase(1, evt => {
    //   const listBookingStore = evt.currentTarget.result.createObjectStore('list-booking', {keyPath: 'id', autoIncrement: true});
    //   listBookingStore.createIndex('commentable', 'commentable', {unique: false});
    //   listBookingStore.createIndex('dateTime', 'dateTime', {unique: false});
    //   listBookingStore.createIndex('note', 'note', {unique: false});
    //   listBookingStore.createIndex('status', 'status', {unique: false});
    //   listBookingStore.createIndex('statusReason', 'statusReason', {unique: false});
    //   listBookingStore.createIndex('patient', 'patient', {unique: false});
    // });
  }

  connecttoDBUser(user: Patient) {
    this.db.openDatabase(1).then(function () {
      console.log("from idb" + user);
      this.db.add('user', {
        userId: user.userId,
        name: user.name,
        personIdNumber: user.personIdNumber,
        phoneNumber: user.phoneNumber,
        weight: user.weight,
        height: user.height,
        avatarImg: user.avatarImg,
        dateOfBirth: user.dateOfBirth,
        description: user.description,
        gender: user.gender,
      }).then(
        () => {

        },
        error => {
          console.log(error);
        }
      );
    }
    )
  }

  getUser(): Observable<any>  {
    const p = this.db.openDatabase(1);
    return from(p.then(() => this.db.getAll('user')));
  }

  updateUser(user: Patient) {
    const p = this.db.openDatabase(1);
    p.then(function () {
      this.db.update('user', {
        userId: user.userId,
        name: user.name,
        personIdNumber: user.personIdNumber,
        phoneNumber: user.phoneNumber,
        weight: user.weight,
        height: user.height,
        avatarImg: user.avatarImg,
        dateOfBirth: user.dateOfBirth,
        description: user.description,
        gender: user.gender,
      }).then(
        () => {

        },
        error => {
          console.log(error);
        }
      );
    }
    )
  }

  // addListBooking(listBooking: ListBooking[]){
  //   this.db.openDatabase(1).then(() =>
  //   listBooking.forEach(x => {
  //     this.db.add('list-booking', {
  //       id: x.id,
  //       commentable: x.commentable,
  //       dateTime: x.dateTime,
  //       note: x.note,
  //       status: x.status,
  //       statusReason: x.statusReason,
  //       patient: x.patient,
  //     }).then(
  //       () => {
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   })
  // );
  // }

  // getListBooking(): Observable<any> {
  //   const p = this.db.openDatabase(1);
  //   return from(p.then(() => this.db.getAll('list-booking')));
  // }

  // updateListBooking(listBooking: ListBooking[]){
  //   this.db.openDatabase(1).then(() =>
  //   listBooking.forEach(x => {
  //     this.db.update('list-booking', {
  //       id: x.id,
  //       commentable: x.commentable,
  //       dateTime: x.dateTime,
  //       note: x.note,
  //       status: x.status,
  //       statusReason: x.statusReason,
  //       patient: x.patient,
  //     }).then(
  //       () => {
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   })
  // );
  // }

  addHealthRecord(healthRecord: HealthRecord){
   
  }
}