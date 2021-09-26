export class SmsToBeSent {
    constructor(
        public recipients: string[],
        public message: string,
        public serviceId: number,
        public smsOff: boolean,
        public encoding: number,
        public totalSmsNumber: number
    ) {}

}