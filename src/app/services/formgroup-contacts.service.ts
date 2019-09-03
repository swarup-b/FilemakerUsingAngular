import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormgroupContactsService {

  constructor(private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    fullname: [''],
    title: [''],
    email: [''],
    phone: [''],
    dob: [''],
    recordId: ['']
  });
  populateForm(contacts) {
    this.form.controls.fullname.setValue(contacts.fullname);
    this.form.controls.title.setValue(contacts.title);
    this.form.controls.phone.setValue(contacts.phone);
    this.form.controls.email.setValue(contacts.email);
    this.form.controls.dob.setValue(contacts.dob);
    this.form.controls.recordId.setValue(contacts.recordId);

  }
}

