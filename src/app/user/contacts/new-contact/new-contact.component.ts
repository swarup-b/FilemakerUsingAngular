import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedVarService } from '../../../service/shared-var.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/service/form.service';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})

export class NewContactComponent implements OnInit {
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';
  fileUploadProgress: number;
  newContact: FormGroup;
  previewUrl: any = null;
  imagePath: any = null;
  isSubmitted = false;
  dialogType: string;
  confirmBox: any;
  message: string;
  fileData: File;
  progress = true;

  constructor(
    private _service: ApiService,
    private _matDialogRef: MatDialogRef<NewContactComponent>,
    private _matService: SharedVarService,
    private _tosterService: ToastrService,
    private _formService: FormService,
    private _dialogService: ConfirmDialogService,
    public spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.spinner.hide();
    this._matService.contactlist.next(false);
    this.previewUrl = this.data.imgPath;
    if (this.previewUrl === undefined) {
      this.previewUrl = 'http://simpleicon.com/wp-content/uploads/account.png';
    }
    this.dialogType = this.data.type;
    this.newContact = this._formService.form;
  }

  // Commit the Records
  saveContact() {
    this.isSubmitted = true;
    if (this.newContact.invalid) {
      return;
    }
    this.spinner.show();
    const contactDetails = this.mordifyDate(this.newContact.value);
    const contactData = new FormData();
    contactData.append('profilePic', this.newContact.get('profilePic').value);
    contactData.append('fullname', this.newContact.get('fullname').value);
    contactData.append('title', this.newContact.get('title').value);
    contactData.append('email', this.newContact.get('email').value);
    contactData.append('phone', this.newContact.get('phone').value);
    contactData.append('dob', contactDetails.dob);
    contactData.append('recordId', this.newContact.get('recordId').value);
    this._service.saveContacts(contactData, this.url).subscribe(
      response => {
        if (response.data === 'Successful') {
          this.message = response.data;
          this.newContact.reset();
          this._matDialogRef.close();
          this._matService.contactlist.next(true);
          this.spinner.hide();
          this._tosterService.success('Created Successfully..');
        } else {
          console.log(response);
          this.spinner.hide();
          this._tosterService.error('An error Occured');
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  // Update record
  update() {
    this.isSubmitted = true;
    if (this.newContact.invalid) {
      return;
    }
    this.spinner.show();
    const updateDetails = this.mordifyDate(this.newContact.value);
    updateDetails.profilePic = this.previewUrl;
    this._service.updateContacts(updateDetails, this.url, this.newContact.get('recordId').value).subscribe(
      response => {
        this._matService.contactlist.next(true);
        this._tosterService.success('Updated Successfully..');
        this.newContact.markAsPristine({ onlySelf: true });
        this.spinner.hide();
        this.onclose();

      },
      error => {
        console.log(error);
      }
    );
  }

  // Upload Profile Picture
  async fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.newContact.get('profilePic').setValue(this.fileData);
    if (this.dialogType === 'update') {
      this.changeProfilePic(this.fileData);
      this.base64Decode();
      return;
    }
    this.base64Decode();
  }
  // Change Profile Picture
  changeProfilePic(file) {
    this.progress = false;
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/upload';
    const formField = new FormData();
    formField.append('profilePic', file);
    formField.append('recordId', this.newContact.value.recordId);
    this._service.uploadImage(url, formField).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100);
        console.log(this.fileUploadProgress);
      } else if (events.type === HttpEventType.Response) {
        this.progress = true;
        this._tosterService.success('Changed successfully');
        this._matService.contactlist.next(true);
      }
    });
  }
  // Base64 decode
  base64Decode() {
    const filereader = new FileReader();
    filereader.readAsDataURL(this.fileData);
    filereader.onloadend = () => {
      this.previewUrl = filereader.result;
    };

  }

  // custom confirm Dialog
  confirmDialog(titel, msg) {
    return this._dialogService.confirm(titel, msg)
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }

  // Close dialogbox
  async onclose() {
    if (!this.newContact.pristine) {
      const res = await this.confirmDialog('Alert', 'Are you sure to move without saving.');
      if (!res) {
        return;
      }
    }
    this.newContact.reset();
    this._matDialogRef.close();
  }
  // Mordify date
  mordifyDate(formValue) {
    const OldDob = formValue.dob;
    const d = new Date(OldDob);
    const utcDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const convertedDate = new Date(utcDate);
    formValue.dob = convertedDate;
    return formValue;
  }


  // Return form instance
  get f() { return this.newContact.controls; }


  // Text Box Sanitization
  omitSpecial(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }

  // Error Message for Field
  getErrorMessage(message) {
    if (message === 'fullname') {
      return this.f.fullname.hasError('required') ? 'fullname is required' : '';
    }
    if (message === 'title') {
      return this.f.title.hasError('required') ? 'title is required' : '';
    }
    if (message === 'email') {
      return this.f.email.hasError('email') ? 'enter a valid email' :
        this.f.email.hasError('required') ? 'email is required' : '';
    }
    if (message === 'phone') {
      return this.f.phone.hasError('required') ? 'phone is required' :
        this.f.phone.hasError('minlength') ? 'must be 10 digit' :
          this.f.phone.hasError('maxlength') ? 'must be 10 digit' : '';
    }
    if (message === 'dob') {
      return this.f.dob.hasError('required') ? 'dob is required' : '';
    }
  }
}
