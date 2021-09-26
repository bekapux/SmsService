export class ApplicationUser {

  constructor(
    public applicationUserId: number,
    public username: string,
    public fullname: string,
    public isAdmin: boolean,
    public isActive: boolean,
    public token: string,
    public userCreationDate?: Date
  ) {}

}