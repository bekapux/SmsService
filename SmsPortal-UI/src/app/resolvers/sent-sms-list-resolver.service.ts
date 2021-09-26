import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SentSmsService } from "../services/sent-sms.service";

@Injectable({providedIn:'root'})
export class SentSmsListResolver implements Resolve<[]>{
    constructor(private sentSmsService: SentSmsService){}

    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<any> | Promise<any> | any{
        return this.sentSmsService.getAll();
    }
}