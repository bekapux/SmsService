import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApplicationUser } from 'src/app/models/application-user.model';
import { AccountService } from 'src/app/services/account.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  infoIcon=faInfoCircle;
  accounts : ApplicationUser[]=[];
  
  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  onRemoveClick(applicationUserId) {
    this.accountService.delete(applicationUserId).subscribe();
    this.getAllAccounts();
  }

  private getAllAccounts(){
    this.route.data.subscribe((data: Data)=>{
      this.accounts = data['data']
    });
  }

}
