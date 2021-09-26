import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/group.model';
import { GroupAndCategoryService } from 'src/app/services/group-and-category.service';

@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  styleUrls: ['./groups-edit.component.css'],
})
export class GroupsEditComponent implements AfterViewInit {
  // Table
  groups = new MatTableDataSource<Group>();
  displayedColumns: string[] = ['groupName'];

  constructor(private groupService: GroupAndCategoryService) {
    this.getGroups();
  }
  private getGroups() {
    this.groupService.getAllGroups().subscribe((res: Group[]) => {
      this.groups.data = res;
    });
  }
  ngAfterViewInit(): void {
    this.groups.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // /Table

  // Edit Modal
  editMode: boolean = false;
  groupEditMode: boolean = false;
  groupEditForm: FormGroup = new FormGroup({
    groupId: new FormControl(null),
    groupName: new FormControl(null),
  });

  selectToEdit(groupId) {
    this.editMode = true;
    this.groupEditMode = true;
    this.groupService.getSingleGroup(groupId).subscribe((res: Group) => {
      this.groupEditForm = new FormGroup({
        groupId: new FormControl(res.groupId),
        groupName: new FormControl(res.groupName, [
          Validators.required,
          Validators.minLength(3),
        ]),
      });
    });
  }
  onEditGroupSubmit() {
    this.groupService
      .addGroup({
        groupId: this.groupEditForm.value.groupId,
        groupName: this.groupEditForm.value.groupName,
      })
      .subscribe((res) => {
        this.getGroups();
      });
    this.editMode = false;
    this.groupEditMode = false;
  }
  // /Edit Modal

  // Add Group Mode
  addGroupMode: boolean = false;
  addGroupForm: FormGroup = new FormGroup({
    groupName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  addGroupSubmit() {
    this.groupService
      .addGroup({ groupName: this.addGroupForm.value.groupName })
      .subscribe((res) => {
        this.getGroups();
      });
    this.exitModal();
  }
  // /Add Group Mode
  exitModal() {
    this.editMode = false;
    this.groupEditMode = false;
    this.addGroupMode = false;
  }
}
