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
export class UploadFileService {

  private url = `${environment.apiUrlApi}/booking/search`;

  constructor(private http: HttpClient) {
  }

}
