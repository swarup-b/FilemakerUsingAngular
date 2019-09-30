import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SharedVarService } from '../../../service/shared-var.service';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/service/form.service';


@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  newContact: FormGroup;
  message: string;
  isSubmitted = false;
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';
  dialogType: string;
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
    this.dialogType = this.data.type;
    this.newContact = this.formService.form;
    // 
    // this.newContact = this.fb.group({
    //   fullname: ['', Validators.required],
    //   title: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    //   dob: ['']
    // });
  }
  // Commit the Records
  saveContact() {
    this.isSubmitted = true;
    if (this.newContact.invalid) {
      return;
    }
    const OldDob = this.newContact.value.dob;
    const d = new Date(OldDob);
    const date = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const date1 = new Date(date);
    this.newContact.value.dob = date1;
    this.service.saveContacts(this.newContact.value, this.url).subscribe(
      response => {
        if (response.data === 'Successful') {
          this.message = response.data;
          this.newContact.reset();
          this.matDialogRef.close();
          this.matService.contactlist.next(true);
          this.tosterService.success('Created Successfully..');
        } else {
          this.tosterService.error('An error Occured');
        }
      },
      error => {
        console.log(error);
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
    // this.spinner = true;
    this.isSubmitted = true;
    this.service.updateContacts(this.newContact.value, this.url).subscribe(
      response => {
        this.matService.contactlist.next(true);
        this.tosterService.success('Updated Successfully..');
        this.newContact.markAsPristine({ onlySelf: true });
        this.onclose();
        // this.spinner = false;
      },
      error => {
        console.log(error);
      }
    );
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
