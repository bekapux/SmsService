import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "../services/account.service";

@Injectable()
export class AccountsTableResolver implements Resolve<any>{

    constructor(
        private accountService: AccountService
    ){}

    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<any> | Promise<any> | any{
        return this.accountService.getAll();
    }
}