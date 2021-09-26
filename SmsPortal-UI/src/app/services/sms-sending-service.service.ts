import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SmsToBeSent } from '../models/sms-to-be-sent.model';

@Injectable({
  providedIn: 'root'
})
export class SmsSendingServiceService {

  constructor(
    private http: HttpClient
  ) { }

  sendSms(smsToBeSent: SmsToBeSent) {    
    return this.http.post<SmsToBeSent>(`${environment.webApi}/SendSms`, smsToBeSent);
  }
}