import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SearchResult } from '../../model/searchresult';
import { Address } from 'src/app/model/address';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private urlSearch = `${environment.apiUrlApi}/booking/search`;

  constructor(private http: HttpClient) {
  }

  getListDoctor(symptom: any, lat: number, long: number, partOfDay: any): Observable<SearchResult[]> {
    let url = this.urlSearch;
    url = url + '?symptom=' + symptom + '&lat=' + lat + '&lng=' + long + '&partOfDay=' + partOfDay;
    return this.http.get<SearchResult[]>(url)
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
