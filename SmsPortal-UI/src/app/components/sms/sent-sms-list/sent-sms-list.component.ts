import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SentSmsGroup } from 'src/app/models/sent-sms-group.model';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LoggerService } from 'src/app/services/logger.service';
import { DetailsVisit } from 'src/app/models/details-visit-log.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SentSmsSearchParams } from 'src/app/models/sent-sms-search-params.model';
import { SentSmsService } from 'src/app/services/sent-sms.service';

@Component({
  selector: 'app-sent-sms-list',
  templateUrl: './sent-sms-list.component.html',
  styleUrls: ['./sent-sms-list.component.css'],
})
export class SentSmsListComponent implements OnInit, AfterViewInit {
  isAdmin: boolean = JSON.parse(localStorage.getItem('SmsPortal-currentUser'))
    .isAdmin;
  infoIcon = faInfoCircle;
  dataSource = new MatTableDataSource<SentSmsGroup>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'author',
    'numberOfRecipients',
    'text',
    'dateSent',
    'totalSmsNumber',
    'serviceId',
    'details',
  ];
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public loggerService: LoggerService,
    private route: ActivatedRoute,
    private sentSmsService: SentSmsService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      // this.dateAdapter.setLocale('en-GB');
      this.dataSource.data = data['data'];
    });
  }

  logDetailsVisit(dateVisited) {
    let object: DetailsVisit = {
      dateSent: dateVisited,
    };
    this.loggerService.log(object).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      }
    );
  }

  // Search Form

  sentSmsSearchForm: FormGroup = new FormGroup({
    author: new FormControl(),
    numberOfRecipients: new FormControl(),
    text: new FormControl(),
    dateSentStart: new FormControl(),
    dateSentEnd: new FormControl(),
    totalSmsNumber: new FormControl(),
    serviceId: new FormControl(),
  });

  onResetFormClick() {
    this.sentSmsSearchForm.reset();
  }

  onSearchSubmit() {
    let dateSentStart;
    dateSentStart = this.datePipe.transform(
      this.sentSmsSearchForm.value.dateSentStart,
      'yyyy-MM-dd'
    );
    
    const dateSentEnd = this.datePipe.transform(
      this.sentSmsSearchForm.value.dateSentEnd,
      'yyyy-MM-dd'
    );
    const searchParams: SentSmsSearchParams = {
      author: this.sentSmsSearchForm.value.author,
      dateSentStart: dateSentStart,
      dateSentEnd: dateSentEnd,
      serviceId: this.sentSmsSearchForm.value.serviceId,
      numberOfRecipients: this.sentSmsSearchForm.value.numberOfRecipients,
      text: this.sentSmsSearchForm.value.text,
      totalSmsNumber: this.sentSmsSearchForm.value.totalSmsNumber,
    };
    console.log(searchParams);
    this.sentSmsService.getFiltered(searchParams).subscribe((res)=>{
      this.dataSource.data=res;
      console.log(res)
    })
  }
}
