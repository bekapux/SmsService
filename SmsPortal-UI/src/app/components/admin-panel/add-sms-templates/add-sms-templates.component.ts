import { Component, OnInit } from '@angular/core';
import { SmsTemplatesService } from 'src/app/services/sms-templates.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-sms-templates',
  templateUrl: './add-sms-templates.component.html',
  styleUrls: ['./add-sms-templates.component.css'],
})
export class AddSmsTemplatesComponent implements OnInit {
  constructor(public smsTemplatesService: SmsTemplatesService) {}
  isAdmin: boolean = JSON.parse(localStorage.getItem('SmsPortal-currentUser')).isAdmin;

  circleInfoIcon = faInfoCircle;

  ngOnInit(): void {
    this.smsTemplatesService.fetchTemplates().subscribe();
  }

  onRemove(smsTemplateId) {
    this.smsTemplatesService.delete(smsTemplateId).subscribe();
  }
}
