import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { faSignOutAlt, faCaretDown, faUserShield, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //Icons
  signOutIcon=faSignOutAlt;
  caretDownIcon=faCaretDown;
  adminIcon=faUserShield;
  userIcon=faUser;
  //Variables
  exitVisible = false;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private _eref:ElementRef
    ) { }

  
  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

  onAccountClick(){
    this.exitVisible = !this.exitVisible;
  }
  onClick(event){
    if(!this._eref.nativeElement.contains(event.target)){
      this.exitVisible=false;
    }
  }

}
