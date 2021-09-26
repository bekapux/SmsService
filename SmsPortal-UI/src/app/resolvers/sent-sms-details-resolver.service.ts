import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SentSmsService } from "../services/sent-sms.service";

@Injectable()
export class SentSmsDetailsResolver implements Resolve<Account>{

    constructor(
        private sentSmsService: SentSmsService
    ){}

    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<any> | Promise<any> | any{
        return this.sentSmsService.get(route.params['id'])
    }
}