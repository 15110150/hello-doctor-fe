import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListBooking } from '../../model/list-booking';
import { Patient } from 'src/app/model/patient';
import { NgxIndexedDB } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  db;
  userPro: Patient;

  constructor() {

  }
  connecttoDBUser(user: Patient) {
    let db = new NgxIndexedDB('myDb', 1);
    db.openDatabase(1, evt => {
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
    }).then(function () {
      console.log("from idb" + user);
      db.add('user', {
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
  getUser(): Patient {
    let db = new NgxIndexedDB('myDb', 1);
    var userPro = new Patient();
    db.openDatabase(1, evt => {
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
    }).then(function () {
      db.getAll('user').then(
        people => {
          const data = people[0];
          console.log(data);
          userPro.userId = data.userId,
            userPro.name = data.name,
            userPro.personIdNumber = data.personIdNumber,
            userPro.phoneNumber = data.phoneNumber,
            userPro.weight = data.weight,
            userPro.height = data.height,
            userPro.avatarImg = data.avatarImg,
            userPro.dateOfBirth = data.dateOfBirth,
            userPro.description = data.description,
            userPro.gender = data.gender
          return userPro;
        },
        error => {
          console.log(error);
        }
      );
    })
    return userPro;
  }
  updateUser(user: Patient) {
    let db = new NgxIndexedDB('myDb', 1);
    db.openDatabase(1, evt => {
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
    }).then(function () {
      db.update('user', {
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

  // connecttoDBListBooking(ListBooking: ListBooking[]) {
  //   let db = new NgxIndexedDB('myDb', 1);
  //   db.openDatabase(1, evt => {
  //     let objectStore = evt.currentTarget.result.createObjectStore('list-booking', { keyPath: 'userId', autoIncrement: true });
  //     objectStore.createIndex('name', 'name', { unique: false });
  //     objectStore.createIndex('personIdNumber', 'personIdNumber', { unique: false });
  //     objectStore.createIndex('phoneNumber', 'phoneNumber', { unique: false });
  //     objectStore.createIndex('weight', 'weight', { unique: false });
  //     objectStore.createIndex('height', 'height', { unique: false });
  //     objectStore.createIndex('email', 'email', { unique: false });
  //     objectStore.createIndex('avatarImg', 'avatarImg', { unique: false });
  //     objectStore.createIndex('dateOfBirth', 'dateOfBirth', { unique: false });
  //     objectStore.createIndex('description', 'description', { unique: false });
  //     objectStore.createIndex('gender', 'gender', { unique: false });
  //   }).then(function () {
  //     console.log("from idb" + user);
  //     db.add('user', {
  //       userId: user.userId,
  //       name: user.name,
  //       personIdNumber: user.personIdNumber,
  //       phoneNumber: user.phoneNumber,
  //       weight: user.weight,
  //       height: user.height,
  //       avatarImg: user.avatarImg,
  //       dateOfBirth: user.dateOfBirth,
  //       description: user.description,
  //       gender: user.gender,
  //     }).then(
  //       () => {

  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   }
  //   )
  // }
}