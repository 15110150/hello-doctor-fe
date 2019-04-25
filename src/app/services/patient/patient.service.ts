import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private urlPatient = `${environment.apiUrlApi}/account/profile`;

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<Patient> {
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    let header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + accessToken.token);
    let url = this.urlPatient;
    return this.http.get<Patient>(url, {
      headers: header
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }
}
