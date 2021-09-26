import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SmsSendingServiceService } from 'src/app/services/sms-sending-service.service';
import { SmsTemplatesService } from 'src/app/services/sms-templates.service';
import { SmsToBeSent } from 'src/app/models/sms-to-be-sent.model';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { count } from 'sms-length';

@Component({
  selector: 'app-multiple-recipients',
  templateUrl: './multiple-recipients.component.html',
  styleUrls: ['./multiple-recipients.component.css'],
})
export class MultipleRecipientsComponent implements OnInit {
  // FA ICONS
  plusIcon = faPlus;
  minusIcon = faMinus;
  // ==================
  smsNumber: number = 0;
  charCount: number = 0;
  smsPerRecipient: number = 0;
  encoding: number;
  totalSmsNumber: number;
  // ==================
  smsTemplates = [];
  activeSmsTemplates = [];
  recipients = [];
  showSmsTemplates = false;
  sendSmsForm: FormGroup;
  recipient: FormGroup;
  noSmsText: string = 'NOSMS 91940';
  language: string = 'ლათინური';
  remaining: number = 160;

  constructor(
    private smsTemplatesService: SmsTemplatesService,
    private smsSendingService: SmsSendingServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchTemplates();
    this.createForm();
    this.onCount();
  }

  onSend() {
    this.sendSmsSubscribe();
    //if you want form reset uncomment below
    //this.resetForm();
  }

  onCount() {
    const smsOff: Boolean = this.sendSmsForm.get('smsOff').value;
    const message = this.sendSmsForm.get('message').value;
    const recipientsArray = <FormArray>this.sendSmsForm.get('recipients');
    //
    if (smsOff === true) {
      this.charCount = count(message + this.noSmsText).length;
      this.remaining = count(message + this.noSmsText).remaining;
      this.smsPerRecipient = count(message + this.noSmsText).messages;
    } else {
      this.charCount = count(message).length;
      this.smsPerRecipient = count(message).messages;
      this.remaining = count(message).remaining;
      this.smsPerRecipient = count(message).messages;
    }

    this.language =
      count(message).encoding.indexOf('GSM') == -1 ? 'ქართული' : 'ლათინური';

    this.encoding = count(message).encoding === 'GSM_7BIT' ? 1 : 2;
    this.totalSmsNumber = recipientsArray.length * this.smsPerRecipient;
  }

  onAddRecipient() {
    const item = new FormGroup({
      countryCode: new FormControl('995', Validators.required),
      recipient: new FormControl(null, Validators.required),
    });
    (<FormArray>this.sendSmsForm.get('recipients')).insert(0, item);
  }
  onRemoveRecipient(index) {
    const recipientArray = <FormArray>this.sendSmsForm.get('recipients');
    if (recipientArray.length > 1) {
      recipientArray.removeAt(index);
    }
  }

  getControls() {
    return (<FormArray>this.sendSmsForm.get('recipients')).controls;
  }

  onRemoveRecipientClick(index) {
    this.recipients.splice(index, 1);
  }

  onTemplateSelected(index) {
    this.sendSmsForm
      .get('message')
      .setValue(this.activeSmsTemplates[index].text);
    this.showSmsTemplates = false;
    this.onCount();
  }

  /////////////////////////restructured Code
  /////////////////////////restructured Code
  /////////////////////////restructured Code

  createForm() {
    this.sendSmsForm = new FormGroup({
      recipients: new FormArray([
        new FormGroup({
          countryCode: new FormControl('995', Validators.required),
          recipient: new FormControl(null, Validators.required),
        }),
      ]),
      message: new FormControl('', Validators.required),
      serviceId: new FormControl(null, Validators.required),
      smsOff: new FormControl(true),
    });
  }

  fetchTemplates() {
    this.smsTemplatesService.fetchTemplates().subscribe((receivedData) => {
      this.smsTemplates = receivedData;
      for (let i = 0; i < this.smsTemplates.length; i++) {
        if (this.smsTemplates[i].isActive === true) {
          this.activeSmsTemplates.push(this.smsTemplates[i]);
        }
      }
    });
  }

  resetForm() {
    delete this.sendSmsForm;
    this.createForm();
    this.onCount();
    // this.sendSmsForm.reset();
    // this.sendSmsForm.get('message').setValue('');
    // while ((<FormArray>this.sendSmsForm.get('recipients')).length != 1) {
    //   (<FormArray>this.sendSmsForm.get('recipients')).removeAt(0);
    // }
    // this.sendSmsForm.get('smsOff').setValue(true);
  }

  sendSmsSubscribe() {
    const arrayToFix = this.sendSmsForm.get('recipients').value;
    let recipientArray = [];
    for (let i = 0; i < arrayToFix.length; i++) {
      let newRecipient = arrayToFix[i].countryCode + arrayToFix[i].recipient;
      recipientArray.push(newRecipient);
    }
    let smsToBeSent: SmsToBeSent = new SmsToBeSent(
      recipientArray,
      this.sendSmsForm.get('message').value,
      this.sendSmsForm.get('serviceId').value,
      this.sendSmsForm.get('smsOff').value,
      this.encoding,
      this.totalSmsNumber
    );
    console.log(smsToBeSent);
    this.smsSendingService.sendSms(smsToBeSent).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
        this.toastr.error('შიდა სისტემური შეცდომა');
      },
      () => {
        this.toastr.success('წარმატებით გაიგზავნა');
      }
    );
  }
}
