import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SentSmsGroup } from '../models/sent-sms-group.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SentSmsSingle } from '../models/sent-sms-single.model';
import { map } from 'rxjs/operators';
import { SentSmsSearchParams } from '../models/sent-sms-search-params.model';

@Injectable({
  providedIn: 'root',
})
export class SentSmsService {
  constructor(private http: HttpClient) {}

  sentSmsGroup: SentSmsGroup[] = [];

  getAll(): Observable<SentSmsGroup[]> {
    return this.http.get<SentSmsGroup[]>(`${environment.webApi}/SentSms`).pipe(
      map((sentSmsGroup) => {
        for (let i = 0; i < sentSmsGroup.length; i++) {
          sentSmsGroup[i].serviceId =
            sentSmsGroup[i].serviceId === 1 ? 'SIS' : 'Inspector';
        }
        return sentSmsGroup;
      })
    );
  }

  getFiltered(searchParameters: SentSmsSearchParams):Observable<SentSmsGroup[]>{
    return this.http.post<SentSmsGroup[]>(`${environment.webApi}/SentSms/filter`, searchParameters).pipe(
      map((sentSmsGroup) => {
        for (let i = 0; i < sentSmsGroup.length; i++) {
          sentSmsGroup[i].serviceId =
            sentSmsGroup[i].serviceId === 1 ? 'SIS' : 'Inspector';
        }
        return sentSmsGroup;
      })
    );
  }


  get(dateSent): Observable<SentSmsSingle[]> {
    return this.http
      .get<SentSmsSingle[]>(`${environment.webApi}/SentSms/` + dateSent)
      .pipe(
        map((sentSmsSingle) => {
          for (let i = 0; i < sentSmsSingle.length; i++) {
            sentSmsSingle[i].serviceId =
              sentSmsSingle[i].serviceId == 1 ? 'SIS' : 'Inspector';
          }
          return sentSmsSingle;
        })
      );
  }


}
