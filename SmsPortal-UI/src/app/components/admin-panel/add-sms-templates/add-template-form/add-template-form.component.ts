import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SmsTemplatesService } from 'src/app/services/sms-templates.service';
import { SmsTemplateCreate } from 'src/app/models/sms-template-create.model';
import {
  faPlus,
  faSignature,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-template-form',
  templateUrl: './add-template-form.component.html',
  styleUrls: ['./add-template-form.component.css'],
})
export class AddTemplateFormComponent {
  constructor(
    private smsTemplateService: SmsTemplatesService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  plusIcon = faPlus;
  signatureIcon = faSignature;
  textIcon = faCommentDots;
  smsTemplateForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    text: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSubmit() {
    let smsTemplateCreate: SmsTemplateCreate = new SmsTemplateCreate(
      this.smsTemplateForm.value.title,
      this.smsTemplateForm.value.text
    );
    smsTemplateCreate.isActive = true;
    console.log(smsTemplateCreate);
    this.smsTemplateService.create(smsTemplateCreate).subscribe(
      (res) => {
        this.router
          .navigate(['/homepage', { skipLocationChange: true }])
          .then(() => {
            this.router.navigate(['/adminPanel/smstemplates']);
          });
      },
      (err) => {
        this.toastr.error(
          'შიდა სისტემური შეცდომა, დაუკავშირდით ადმინისტრატორს'
        );
      }
    );
    this.smsTemplateForm.reset();
  }
}
