import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmsTemplateCreate } from 'src/app/models/sms-template-create.model';
import { SmsTemplate } from 'src/app/models/sms-template.model';
import { SmsTemplatesService } from 'src/app/services/sms-templates.service';

@Component({
  selector: 'app-sms-template-details',
  templateUrl: './sms-template-details.component.html',
  styleUrls: ['./sms-template-details.component.css'],
})
export class SmsTemplateDetailsComponent implements OnInit {
  smsTemplate: SmsTemplate;
  areYouSure: boolean = false;
  editMode: boolean = false;
  smsTemplateEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private smsTemplateService: SmsTemplatesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resolveTemplateDetails();
    this.createSmsTemplateEditForm();
  }

  onSubmit() {
    let smsTemplateCreate: SmsTemplateCreate = new SmsTemplateCreate(
      this.smsTemplateEditForm.get('title').value,
      this.smsTemplateEditForm.get('text').value,
      this.smsTemplateEditForm.get('isActive').value,
      this.smsTemplate.smsTemplateId
    );

    this.smsTemplateService.create(smsTemplateCreate).subscribe((res) => {
      this.navigateToParentRoute();
    });
  }

  //restructure
  private navigateToParentRoute() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  resolveTemplateDetails() {
    this.route.data.subscribe((res) => {
      this.smsTemplate = res.data;
    });
  }

  createSmsTemplateEditForm() {
    this.smsTemplateEditForm = new FormGroup({
      title: new FormControl(this.smsTemplate.title, [
        Validators.required,
        Validators.minLength(3),
      ]),
      text: new FormControl(this.smsTemplate.text, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(910),
      ]),
      isActive: new FormControl(this.smsTemplate.isActive, [
        Validators.required,
      ]),
    });
  }
}
