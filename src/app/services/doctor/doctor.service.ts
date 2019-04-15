import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SearchResult } from '../../model/searchresult';
import { Doctor } from 'src/app/model/doctor';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlDoctor = `${environment.apiUrlApi}/account/profile/doctor`;

  constructor(private http: HttpClient) {
  }

  getDoctor(id : number): Observable<Doctor> {
    let url = this.urlDoctor;
    url = url + '/' + id ;
    return this.http.get<Doctor>(url)
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }

 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
