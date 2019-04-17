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

  private urlDoctor = `${environment.apiUrlApi}/account/profile/patient`;

  constructor(private http: HttpClient) {
  }

  getUser(id : number): Observable<Patient> {
    let url = this.urlDoctor;
    url = url + '/' + id ;
    return this.http.get<Patient>(url)
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }
}
