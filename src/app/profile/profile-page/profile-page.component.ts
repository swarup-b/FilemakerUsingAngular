import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedVarService } from '../../service/shared-var.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/service/form.service';
import { HttpEventType } from '@angular/common/http';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { NewContactComponent } from 'src/app/user/contacts/new-contact/new-contact.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  spinner = false;
  fileData: File;
  newContact: FormGroup;
  message: string;
  isSubmitted = false;
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';
  dialogType: string;
  previewUrl: any = null;
  fileUploadProgress: string;
  imagePath: any = null;
  confirmBox: any;
  constructor(
    private _service: ApiService,
    private _matDialogRef: MatDialogRef<NewContactComponent>,
    private _matService: SharedVarService,
    private _tosterService: ToastrService,
    private _formService: FormService,
    private _dialogService: ConfirmDialogService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this._matService.contactlist.next(false);
    this.previewUrl = this.data.imgPath;
    if (this.previewUrl === undefined) {
      this.previewUrl = 'http://simpleicon.com/wp-content/uploads/account.png';
    }
    this.dialogType = this.data.type;
    this.newContact = this._formService.form;
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
  // Commit the Records
  saveContact() {
    this.isSubmitted = true;
    if (this.newContact.invalid) {
      return;
    }
    this.spinner = true;
    const contactDetails = this.mordifyDate(this.newContact.value);
    this.newContact.value.profilePic = this.imagePath;
    this._service.saveContacts(contactDetails, this.url).subscribe(
      response => {
        if (response.data === 'Successful') {
          this.message = response.data;
          this.newContact.reset();
          this._matDialogRef.close();
          this._matService.contactlist.next(true);
          this.spinner = false;
          this._tosterService.success('Created Successfully..');
        } else {
          console.log(response);
          this.spinner = false;
          this._tosterService.error('An error Occured');
        }
      },
      error => {
        console.log(error);
        this.spinner = false;
      }
    );
  }
  // Update record
  update() {
    this.isSubmitted = true;
    if (this.newContact.invalid) {
      return;
    }
    const updateDetails = this.mordifyDate(this.newContact.value);
    this.newContact.value.profilePic = this.previewUrl;
    this.spinner = true;
    // this._service.updateContacts(updateDetails, this.url).subscribe(
    //   response => {
    //     this._matService.contactlist.next(true);
    //     this._tosterService.success('Updated Successfully..');
    //     this.newContact.markAsPristine({ onlySelf: true });
    //     this.spinner = false;
    //     this.onclose();

    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
  // Upload Profile Picture
  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.uploadPhoto();
  }
  // Upload Photo to server
  uploadPhoto() {
    this.fileUploadProgress = '0%';
    const formData = new FormData();
    formData.append('file', this.fileData);
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/upload';
    this._service.uploadImage(url, formData).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      } else if (events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        this.imagePath = events.body.path;
        this.previewUrl = this.imagePath;
      }
    });
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
  // Return form instance
  get f() { return this.newContact.controls; }
  // Text Box Sanitization
  omitSpecial(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }

}
