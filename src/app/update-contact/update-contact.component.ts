import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormgroupContactsService } from '../services/formgroup-contacts.service'

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  updateContact: FormGroup;
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';
  constructor(private fb: FormBuilder,
              private service: LoginService,
              private matDialogRef: MatDialogRef<UpdateContactComponent>,
              private contactService: FormgroupContactsService
  ) { }


  ngOnInit() {
    this.updateContact = this.contactService.form;
  }
  onclose() {
    this.updateContact.reset();
    this.matDialogRef.close();
  }

  update() {
    this.service.updateContacts(this.updateContact.value, this.url).subscribe(
      response => {
       console.log(response);
      }
    );

  }
}
