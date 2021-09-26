import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddSingleInAddressBook } from '../models/address-book-add-single.model';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  constructor(private http: HttpClient) {}

  Insert(data: AddSingleInAddressBook | any) {
    return this.http.post(`${environment.webApi}/AddressBook/Single`, data);
  }
}
