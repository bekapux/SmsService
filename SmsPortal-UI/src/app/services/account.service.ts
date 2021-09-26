import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationUserCreate } from '../models/application-user-create.model';
import { ApplicationUserLogin } from '../models/application-user-login.model';
import { ApplicationUser } from '../models/application-user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts: Account[] = [];

  private currentUserSubject$: BehaviorSubject<ApplicationUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<ApplicationUser>(
      JSON.parse(localStorage.getItem('SmsPortal-currentUser'))
    );
  }

  login(model: ApplicationUserLogin): Observable<ApplicationUser> {
    return this.http.post(`${environment.webApi}/Account/login`, model).pipe(
      map((user: ApplicationUser) => {
        if (user) {
          localStorage.setItem('SmsPortal-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: ApplicationUser) {
    this.currentUserSubject$.next(user);
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject$.value;
  }

  public givenUserIsLoggedIn(username: string) {
    return this.isLoggedIn() && this.currentUserValue.username === username;
  }

  public isLoggedIn() {
    const currentUser = this.currentUserValue;
    const isLoggedIn = !!currentUser && !!currentUser.token;
    return isLoggedIn;
  }

  logout() {
    localStorage.removeItem('SmsPortal-currentUser');
    this.currentUserSubject$.next(null);
  }

  getAll(){
    return this.http
      .get<ApplicationUser[]>(`${environment.webApi}/Account`)
      .pipe(map((responseData)=>{
        const accounts = []
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){
            accounts.push(responseData[key])
          }
        }
        this.accounts=accounts;
        return accounts;
      }));
  }

  register(model: ApplicationUserCreate): Observable<ApplicationUser> {
    return this.http.post(`${environment.webApi}/Account/register`, model).pipe(
      map((user: ApplicationUser) => {
        if (user) {
        }
        return user;
      })
    );
  }

  delete(applicationUserId: number): Observable<number> {
    return this.http.delete<number>(
      `${environment.webApi}/account/${applicationUserId}`
    );
  }

  get(applicationUserId: number): Observable<ApplicationUser> {
    return this.http.get<ApplicationUser>(
      `${environment.webApi}/account/` + applicationUserId
    );
  }

  promote(applicationUserId: number){
    return this.http.post(`${environment.webApi}/account/promote/`+ applicationUserId, {})
  }
  denote(applicationUserId: number){
    return this.http.post(`${environment.webApi}/account/denote/`+ applicationUserId, {})
  }
}
