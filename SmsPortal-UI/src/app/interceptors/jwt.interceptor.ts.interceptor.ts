import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.accountService.currentUserValue;
    const isApiUrl = request.url.startsWith(environment.webApi);

    if (this.accountService.isLoggedIn() && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        },
      });
    }
    return next.handle(request).pipe( tap(()=>{}, (err: any)=>{
      if (err.status === 401){
        this.accountService.logout();
        this.router.navigateByUrl('/');
      }
    }));
  }
}
