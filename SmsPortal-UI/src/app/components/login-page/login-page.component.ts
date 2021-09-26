import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationUserLogin } from 'src/app/models/application-user-login.model';
import { AccountService } from '../../services/account.service';
import { faUserTie, faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  // ICONS
  userIcon = faUserTie;
  passwordIcon = faKey;
  //========

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
  });
  error: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['/homepage']);
    }
  }

  isTouched(field: string) {
    return this.loginForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.loginForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.loginForm.get(field).hasError(error);
  }

  onSubmit() {
    let applicationUserLogin: ApplicationUserLogin = new ApplicationUserLogin(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    );

    this.accountService.login(applicationUserLogin).subscribe(
      (result) => {
        if (result.token) {
          this.toastr.success('წარმატებული ავტორიზაცია');
        }
        this.router.navigate(['/homepage']);
      },
      (error) => {
        //this.error=error.error;
        if (error.error == 'User Is Not Active') {
          this.toastr.error('მომხმარებელი არ არის აქტიური');
        } else if (error.status == 400) {
          this.toastr.error('წარუმატებელი მცდელობა');
        } else console.log(error);
      }
    );
  }
}
