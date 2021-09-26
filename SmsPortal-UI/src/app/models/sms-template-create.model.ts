export class SmsTemplateCreate {

    constructor(
        public title: string,
        public text: string,
        public isActive?: boolean,
        public smsTemplateId?: number
    ) {}

}