import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetailsVisit } from '../models/details-visit-log.model';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private http: HttpClient) {}

  log(detailsVisit: DetailsVisit) {
    return this.http.post(`${environment.webApi}/logs/details`, detailsVisit);
  }
}
