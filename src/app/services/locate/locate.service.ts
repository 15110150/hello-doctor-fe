import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Address } from 'src/app/model/address';
import { Coordinate } from 'src/app/model/coordinate';

@Injectable({
  providedIn: 'root'
})
export class LocateService {

  private urlSearch = `${environment.apiUrlApi}/location`;

  constructor(private http: HttpClient) {
  }

  getAddress(lat: number, long: number): Observable<Address> {
    let url = this.urlSearch;
    url = url + '/geocoding/toAddress?lat=' + lat + '&lng=' + long;
    return this.http.get<Address>(url)
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }

 getCoordinate(address: string): Observable<Coordinate>{
  let url = this.urlSearch;
  url = url + '/geocoding/toCoordinate?address=' + address;
  return this.http.get<Coordinate>(url)
    .pipe(
      map(response => {
        const data = response;
        return data;
      }));
 }

 getAutocomple(word: string): Observable<[]>
 {
  let url = this.urlSearch;
  url = url + '/autoComplete?word=' + word ;
  return this.http.get<[]>(url)
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
