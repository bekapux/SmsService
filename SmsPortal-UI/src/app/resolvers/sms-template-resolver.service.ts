import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { SmsTemplatesService } from "../services/sms-templates.service";

@Injectable({providedIn:'root'})
export class SmsTemplateResolver implements Resolve<any> {
    
    constructor(private smsTemplateService: SmsTemplatesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let id = route.params["id"];
        return this.smsTemplateService.fetchTemplate(id);
    }
}