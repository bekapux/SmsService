import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AddSingleInAddressBook } from 'src/app/models/address-book-add-single.model';
import { Category } from 'src/app/models/category.model';
import { Group } from 'src/app/models/group.model';
import { AddressBookService } from 'src/app/services/address-book.service';
import { GroupAndCategoryService } from 'src/app/services/group-and-category.service';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css'],
})
export class RecipientsComponent implements OnInit, OnChanges {
  plusIcon = faPlus;
  addRecipientForm: FormGroup;
  categories: Category[];
  groups: Group[];
  @Input() inputEvent;

  constructor(
    private addressBookService: AddressBookService,
    private groupAndCategoryService: GroupAndCategoryService,
    private toastr: ToastrService
  ) {
    this.getGroupsAndCategories();
  }
  ngOnChanges() {
    this.getGroupsAndCategories();
  }

  ngOnInit(): void {
    this.addRecipientForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[A-Za-zა-ჰ]*'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[A-Za-zა-ჰ]*'),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[0-9]*'),
      ]),
      group: new FormControl(''),
      category: new FormControl('აირჩიე კატეგორია'),
    });
  }

  getGroupsAndCategories() {
    this.groupAndCategoryService
      .getAllCategories()
      .subscribe((res: Category[]) => {
        this.categories = res;
      });
    this.groupAndCategoryService.getAllGroups().subscribe((res: Group[]) => {
      this.groups = res;
    });
  }

  onSubmit() {
    const address: AddSingleInAddressBook = {
      firstName: this.addRecipientForm.value.firstName,
      lastName: this.addRecipientForm.value.lastName,
      phoneNumber: this.addRecipientForm.value.phoneNumber,
      category: this.addRecipientForm.value.category,
      group: this.addRecipientForm.value.group,
    };

    this.addressBookService.Insert(address).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      },
      () => {
        this.toastr.success('ოპერაცია წარმატებით დასრულდა');
      }
    );
  }

  arrayBuffer: any;
  sumting: AddSingleInAddressBook[];
  file: File;

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      for (let data of XLSX.utils.sheet_to_json(worksheet, { raw: false })) {
        this.addressBookService.Insert(data).subscribe((res) => {
          console.log(res);
        });
      }
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}
