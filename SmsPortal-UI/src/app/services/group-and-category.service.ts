import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddCategory } from '../models/add-category.model';
import { AddGroup } from '../models/add-group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupAndCategoryService {
  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get(`${environment.webApi}/recipientcategory/getall`);
  }
  getAllGroups() {
    return this.http.get(`${environment.webApi}/recipientgroup/getall`);
  }

  getSingleGroup(Id: number){
    return this.http.get(`${environment.webApi}/recipientgroup/${Id}`)
  }
  getSingleCategory(Id: number){
    return this.http.get(`${environment.webApi}/recipientcategory/${Id}`)
  }

  addGroup(group: AddGroup) {
    return this.http.post(`${environment.webApi}/recipientgroup/create`, group);
  }
  addCategory(category: AddCategory) {
    return this.http.post(`${environment.webApi}/recipientcategory/create`, category);
  }
}
