export class ApplicationUserCreate {

    constructor(
        public username: string,
        public password: string,
        public fullname: string,
        public isAdmin: boolean
    ) {}

}