import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Booking } from 'src/app/model/booking';
import { ListBooking } from 'src/app/model/list-booking';
import { Feedback } from 'src/app/model/feedback';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private urlBooking = `${environment.apiUrlApi}/booking`;

  constructor(private http: HttpClient) {
  }

  createBooking(booking: any): Observable<Booking> {
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    let url = this.urlBooking + '/book';
    booking.id = 0;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + accessToken.token);
    return this.http.post<Booking>(url, JSON.stringify(booking), {
      headers: headers
    })
      .pipe(
        map(response => {
          const data = response;
          console.log(data);
          return data;
        }));
  }

  getListBooking(status: any): Observable<ListBooking[]> {
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlBooking;
    url = url + '/book/list?status=' + status;
    return this.http.get<any>(url, {
      headers: header
    }).pipe(
      map(response => {
        const data = response.content;
        return data;
      }));
  }

  updateBooking(booking: any): Observable<Booking> {
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    let url = this.urlBooking + '/book';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + accessToken.token);
    return this.http.post<Booking>(url, JSON.stringify(booking), {
      headers: headers
    })
      .pipe(
        map(response => {
          const data = response;
          console.log(data);
          return data;
        }));
  }

  createdFeedback(feedback: Feedback): Observable<Feedback> {
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    let url = this.urlBooking + "/comment/save";
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + accessToken.token);
    return this.http.post<Feedback>(url, JSON.stringify(feedback), {
      headers: headers
    })
      .pipe(
        map(response => {
          const data = response;
          console.log(data);
          return data;
        }));
  }

  getListBookingAtTime(time: any): Observable<ListBooking[]> {
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlBooking;
    url = url + '/book/list-booked-at-time?dateTime=' + time;
    return this.http.get<any>(url, {
      headers: header
    }).pipe(
      map(response => {
        const data = response;
        return data;
      }));
  }

}
