import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationUserCreate } from 'src/app/models/application-user-create.model';
import { AccountService } from 'src/app/services/account.service';
import {
  faKey,
  faPlus,
  faSignature,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent {
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  plusIcon = faPlus;
  signatureIcon = faSignature;
  userIcon = faUser;
  keyIcon = faKey;
  registerForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
    isAdmin: new FormControl(false, [Validators.required]),
  });

  onSubmit() {
    let applicationUserCreate: ApplicationUserCreate =
      new ApplicationUserCreate(
        this.registerForm.value.username,
        this.registerForm.value.password,
        this.registerForm.value.fullname,
        this.registerForm.value.isAdmin
      );
    this.accountService.register(applicationUserCreate).subscribe(
      (res) => {
        this.router
          .navigate(['/homepage', { skipLocationChange: true }])
          .then(() => {
            this.router.navigate(['/adminPanel']);
            this.toastr.success('მომხმარებელი დაემატა');
          });
      },
      (error) => {
        if (error.error[0].code == 'DuplicateUserName') {
          this.toastr.info('მომხმარებელი უკვე არსებობს');
        } else {
          this.toastr.error('მოხდა შეცდომა');
        }
      }
    );
  }
}
