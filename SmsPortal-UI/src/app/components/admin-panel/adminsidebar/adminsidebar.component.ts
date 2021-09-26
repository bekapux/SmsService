import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent implements OnInit {
  isAdmin: boolean = JSON.parse(localStorage.getItem('SmsPortal-currentUser')).isAdmin;
  constructor() { }

  
  ngOnInit(): void {
  }

}
