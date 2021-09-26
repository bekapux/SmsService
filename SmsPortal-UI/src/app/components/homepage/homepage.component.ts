import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private usersService: AccountService
  ) { }
  count: number = 0;




  ngOnInit(): void {}

  sendOneSMS(){
    this.router.navigate(['oneRecipient'])
  }

  onCount(message){
    this.count = message.value.length;
  }
}