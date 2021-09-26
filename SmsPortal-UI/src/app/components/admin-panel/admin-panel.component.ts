import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users=[];
  showUsers = true;
  showSmsTemplates= false;
  

  constructor(
    private usersService: AccountService
  ) { }

  ngOnInit(): void {
    // this.users = this.usersService.getUsers();
  }
  onUsersClick(){
    this.showUsers = true;
    this.showSmsTemplates= false;
  }
  onTemplatesClick(){
    this.showUsers = false;
    this.showSmsTemplates= true;
  }

}
