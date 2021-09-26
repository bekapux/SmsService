import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model'; 
import { GroupAndCategoryService } from 'src/app/services/group-and-category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css'],
})
export class CategoriesEditComponent implements AfterViewInit {
  // Table
  categories = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['categoryName'];

  constructor(private categoryService: GroupAndCategoryService) {
    this.getCategories();
  }
  private getCategories() {
    this.categoryService.getAllCategories().subscribe((res: Category[]) => {
      this.categories.data = res;
    });
  }
  ngAfterViewInit(): void {
    this.categories.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // /Table

  // Edit Modal
  editMode: boolean = false;
  categoryEditMode: boolean = false;
  categoryEditForm: FormGroup = new FormGroup({
    categoryId: new FormControl(null),
    categoryName: new FormControl(null),
  });

  selectToEdit(categoryId) {
    this.editMode = true;
    this.categoryEditMode = true;
    this.categoryService
      .getSingleCategory(categoryId)
      .subscribe((res: Category) => {
        this.categoryEditForm = new FormGroup({
          categoryId: new FormControl(res.categoryId),
          categoryName: new FormControl(res.categoryName, [
            Validators.required,
            Validators.minLength(3),
          ]),
        });
      });
  }

  onEditCategorySubmit() {
    this.categoryService
      .addCategory({
        categoryId: this.categoryEditForm.value.categoryId,
        categoryName: this.categoryEditForm.value.categoryName,
      })
      .subscribe((res) => {
        this.getCategories();
      });
    this.exitModal();
  }
  // /Edit Modal

  // Add Category Mode
  addCategoryMode: boolean = false;
  addCategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  addCategorySubmit() {
    this.categoryService
      .addCategory({ categoryName: this.addCategoryForm.value.categoryName })
      .subscribe((res) => {
        this.getCategories();
      });
    this.exitModal();
  }
  // /Add Category Mode
  
  exitModal() {
    this.editMode = false;
    this.categoryEditMode = false;
    this.addCategoryMode = false;
  }
}
