import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {


  private url = `${environment.apiUrlApi}/storage/upload`;


  constructor(private http: HttpClient) {
  }

  updateFile(formData: any): Observable<any> {
    console.log(formData);
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken.token);
    return this.http.post<any>(this.url, formData, {
      headers: headers
    })
      .pipe(
        map(res => {
            return res;
          }
        )
      );
  }
}