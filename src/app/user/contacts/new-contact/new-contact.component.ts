import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedVarService } from '../../../service/shared-var.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/service/form.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private matDialogRef: MatDialogRef<NewContactComponent>,
    private matService: SharedVarService,
    private tosterService: ToastrService,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.matService.contactlist.next(false);
    this.previewUrl = this.data.imgPath;
    if (this.previewUrl == 'null') {
      this.previewUrl = 'http://simpleicon.com/wp-content/uploads/account.png';
    }
    this.dialogType = this.data.type;
    this.newContact = this.formService.form;
  }
  // Commit the Records
  saveContact() {
    this.isSubmitted = true;
    if (this.newContact.invalid) {
      return;
    }
    this.spinner = true;
    const OldDob = this.newContact.value.dob;
    const d = new Date(OldDob);
    const date = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const date1 = new Date(date);
    this.newContact.value.dob = date1;
    this.newContact.value.profilePic = this.imagePath;
    // console.log(this.newContact.value);
    // return;
    this.service.saveContacts(this.newContact.value, this.url).subscribe(
      response => {
        if (response.data === 'Successful') {
          this.message = response.data;
          this.newContact.reset();
          this.matDialogRef.close();
          this.matService.contactlist.next(true);
          this.spinner = false;
          this.tosterService.success('Created Successfully..');
        } else {
          console.log(response);
          this.spinner = false;
          this.tosterService.error('An error Occured');
        }
      },
      error => {
        console.log(error);
        this.spinner = false;
      }
    );
  }

  update() {
    if (this.newContact.invalid) {
      return;
    }
    const OldDob = this.newContact.value.dob;
    const d = new Date(OldDob);
    const date = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const newDtae = new Date(date);
    this.newContact.value.dob = newDtae;
    this.newContact.value.profilePic = this.imagePath;
    this.spinner = true;
    this.isSubmitted = true;
    console.log(this.newContact.value);
    this.service.updateContacts(this.newContact.value, this.url).subscribe(
      response => {
        this.matService.contactlist.next(true);
        this.tosterService.success('Updated Successfully..');
        this.newContact.markAsPristine({ onlySelf: true });
        this.spinner = false;
        this.onclose();

      },
      error => {
        console.log(error);
      }
    );
  }
  // Upload Profile Picture
  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.uploadPhoto();
    // console.log(this.fileData);
    this.previewUrl = this.imagePath;
    // this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
      // this.imagePath = reader.result;
    };
  }
  uploadPhoto() {
    this.fileUploadProgress = '0%';
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('data', this.newContact.value);
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/upload';
    this.service.uploadImage(url, formData).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        //  console.log(this.fileUploadProgress);
      } else if (events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        this.preview();
        this.imagePath = events.body.path;
        //  console.log(events.body);
      }
    });
  }
  // Close dialogbox
  onclose() {
    this.newContact.reset();
    this.matDialogRef.close();
  }
  // Return form instance
  get f() { return this.newContact.controls; }

  omitSpecial(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }
}
