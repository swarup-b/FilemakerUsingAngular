import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatDialogRef } from '@angular/material';
import { MatTableService } from '../services/mat-table.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private matDialogRef: MatDialogRef<NewContactComponent>,
    private matService: MatTableService,
    private tosterService: ToastrService
  ) { }

  ngOnInit() {
    this.matService.contactlist.next(false);
    this.newContact = this.fb.group({
      fullname: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dob: ['']
    });
  }
// Commit the Records
  saveContact() {
    this.service.saveContacts(this.newContact.value, this.url).subscribe(
      response => {
        if (response.data === 'Successful') {
          this.message = response.data;
          this.newContact.reset();
          this.matDialogRef.close();
          this.matService.contactlist.next(true);
          this.tosterService.success('Created Successfully..');
        } else {
          this.message = 'An error Occured';
        }
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
}
