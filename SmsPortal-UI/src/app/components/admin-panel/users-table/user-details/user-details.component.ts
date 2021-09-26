import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ApplicationUserCreate } from 'src/app/models/application-user-create.model';
import { ApplicationUserEdit } from 'src/app/models/application-user-edit.model';
import { ApplicationUser } from 'src/app/models/application-user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  applicationUser: ApplicationUser;
  editMode: boolean = false;
  userEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resolveUserDetails();
    this.createUserEditForm();
  }
  onSubmit() {
    let userCreate: ApplicationUserEdit = new ApplicationUserEdit(
      this.userEditForm.get('fullname').value,
      this.userEditForm.get('isAdmin').value
    );
    // this.accountService.register(userCreate).subscribe((res) => {
    //   this.navigateToParentRoute();
    // });
    console.log(userCreate);
  }

  promote(applicationUserId: number) {
    this.accountService.promote(applicationUserId).subscribe(
      (res) => {
        this.updatePage(applicationUserId);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  denote(applicationUserId: number) {
    this.accountService.denote(applicationUserId).subscribe(
      (res) => {
        this.updatePage(applicationUserId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //restructure
  resolveUserDetails() {
    this.route.data.subscribe((data: Data) => {
      this.applicationUser = data['data'];
    });
  }
  createUserEditForm() {
    this.userEditForm = this.formBuilder.group({
      fullname: [this.applicationUser.fullname, Validators.required],
      isAdmin: [this.applicationUser.isAdmin, Validators.required],
    });
  }
  private navigateToParentRoute() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private updatePage(applicationUserId: number){
    this.router.navigate(['/homepage', {skipLocationChange: true}]).then(()=>{
      this.router.navigate(['/adminPanel/user/', applicationUserId]);
    })
  }
}
