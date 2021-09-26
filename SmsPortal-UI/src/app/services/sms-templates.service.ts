import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SmsTemplate } from '../models/sms-template.model';
import { map } from 'rxjs/operators';
import { SmsTemplateCreate } from '../models/sms-template-create.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmsTemplatesService {
  smsTemplates: SmsTemplate[] = [];
  smsTemplate: SmsTemplate;
  newSmsTemplateId: number;

  constructor(private http: HttpClient) {}

  delete(smsTemplateId: number): Observable<number> {
    return this.http.delete<number>(
      `${environment.webApi}/SmsTemplate/${smsTemplateId}`
    );
  }

  fetchTemplates() {
    return this.http.get(environment.webApi + '/smstemplate').pipe(
      map((responseData) => {
        const smsTemplates = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            smsTemplates.push(responseData[key]);
          }
        }
        this.smsTemplates = smsTemplates;
        return smsTemplates;
      })
    );
  }

  fetchTemplate(id) {
    return this.http
      .get<SmsTemplate>(environment.webApi + '/smstemplate/' + id)
      .pipe(
        map((responseData) => {
          let smsTemplate = responseData;
          this.smsTemplate = smsTemplate;
          return smsTemplate;
        })
      );
  }

  getTemplates() {
    return this.smsTemplates;
  }

  create(smsTemplateCreate: SmsTemplateCreate): Observable<SmsTemplate> {
    return this.http.post<SmsTemplate>(
      `${environment.webApi}/SmsTemplate`,
      smsTemplateCreate
    );
  }
}
