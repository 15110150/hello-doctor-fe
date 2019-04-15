import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Address } from 'src/app/model/address';

@Injectable({
  providedIn: 'root'
})
export class LocateService {

  private urlSearch = `${environment.apiUrlApi}/location/geocoding`;

  constructor(private http: HttpClient) {
  }

  getAddress(lat: number, long: number): Observable<Address> {
    let url = this.urlSearch;
    url = url + '/toAddress?lat=' + lat + '&lng=' + long;
    return this.http.get<Address>(url)
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
