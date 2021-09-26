import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Category } from 'src/app/models/category.model';
import { Group } from 'src/app/models/group.model';
import { GroupAndCategoryService } from 'src/app/services/group-and-category.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-group-recipients',
  templateUrl: './group-recipients.component.html',
  styleUrls: ['./group-recipients.component.css'],
})
export class GroupRecipientsComponent implements OnInit {
  groups: Group[] = [];
  categories: Category[] = [];
  smsForm: FormGroup = new FormGroup({
    group: new FormControl(null),
    category: new FormControl(null),
    message: new FormControl(),
  });
  constructor(private groupAndCategoriesService: GroupAndCategoryService) {}
  ngOnInit(): void {
    this.groupAndCategoriesService.getAllGroups().subscribe((res: Group[]) => {
      this.groups = res;
    });
    this.groupAndCategoriesService
    .getAllCategories()
    .subscribe((res: Category[]) => {
      this.categories = res;
      console.log(res);
      });
  }
  onSubmit() {
    console.log(this.smsForm.value);
  }

}
