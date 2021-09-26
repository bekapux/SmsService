import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DetailsVisit } from 'src/app/models/details-visit-log.model';
import { SentSmsSingle } from 'src/app/models/sent-sms-single.model';
import { LoggerService } from 'src/app/services/logger.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-sms-details',
  templateUrl: './sms-details.component.html',
  styleUrls: ['./sms-details.component.css'],
})
export class SmsDetailsComponent implements OnInit {
  sentSmsSingle: SentSmsSingle;
  constructor(
    private route: ActivatedRoute,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.sentSmsSingle = data['data'];
    });
    let object: DetailsVisit = {
      dateSent: this.sentSmsSingle[0].dateSent,
    };
    console.log(this.sentSmsSingle);
    this.loggerService.log(object).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      }
    );
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('statusList');
    let details = document.getElementById('details');
    const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(details);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws2, 'სტატუსი');
    XLSX.utils.book_append_sheet(wb, ws1, 'დეტალები');

    /* save to file */
    XLSX.writeFile(wb, 'დეტალები.xlsx');
  }
}
