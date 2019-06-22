import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompleteService implements AutoCompleteService {

  labelAttribute = 'name';
  private url = `${environment.apiUrlApi}/booking/symptom/auto-complete`;

  private symstoms: any[] = [];

  constructor(private http: HttpClient) {

  }

  getResults(keyword: string): Observable<any[]> {
    let observable: Observable<any>;

    if (this.symstoms.length === 0) {
      let accessToken = JSON.parse(localStorage.getItem('currentUser'));
      let header = new HttpHeaders()
        .set('Authorization', 'Bearer ' + accessToken.token);
      let url = this.url;
      url = url + '?input=' + keyword;
      return this.http.get<any>(url, {
        headers: header
      }).pipe(
        map(
          (result) => {
            return result
          }
        )
      )
    } else {
      observable = of(this.symstoms);
    }
  }

  getSymptom():Observable<any[]> {
    if (this.symstoms.length === 0) {
      let accessToken = JSON.parse(localStorage.getItem('currentUser'));
      let header = new HttpHeaders()
        .set('Authorization', 'Bearer ' + accessToken.token);
      let url = this.url;
      url = url + '?input=';
      return this.http.get<any>(url, {
        headers: header
      }).pipe(
        map(response => {
          const data = response;
          return data;
        }));
    }
  }
}
