import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms'
import { LoginService } from '../services/login.service';
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  newContact: FormGroup;
  matDialogRef : MatDialogRef <NewContactComponent>
  constructor(private fb: FormBuilder, private service: LoginService) { }

  ngOnInit() {

    this.newContact = this.fb.group({
      photo : [''],
      fullname : [''],
      title : [''],
      phone :[''],
      email: [''],
      dob : ['']
    });
  }

  saveContact(){
    console.log(this.newContact.value);
    this.onclose();
  }

  onclose(){
    this.newContact.reset();
    this.matDialogRef.close();
  }

}
