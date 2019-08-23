import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms'
import { LoginService } from '../services/login.service';
import { MatDialogRef } from '@angular/material'
import { FormgroupContactsService } from '../services/formgroup-contacts.service'

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  newContact: FormGroup;
  private url = "http://localhost/EmployeeRegistration/public/user/v1/contacts";
  constructor(private fb: FormBuilder,
     private service: LoginService,
     private matDialogRef : MatDialogRef <NewContactComponent>,
     private contactService :FormgroupContactsService
     ) { }

  ngOnInit() {

    this.newContact=this.contactService.form;

  }

  saveContact(){
    this.service.saveContacts(this.newContact.value , this.url).subscribe(
      data=>{ console.log(data)},
      error=>{}
    );
  }

  onclose(){
    this.newContact.reset();
    this.matDialogRef.close();
  }

}
