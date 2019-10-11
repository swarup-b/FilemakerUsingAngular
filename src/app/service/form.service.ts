import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {


  constructor(private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    profilePic: [''],
    fullname: ['', Validators.required],
    title: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    dob: ['', Validators.required],
    recordId: ['1']
  });
  // set the value to the edit form
  populateForm(contacts) {
    this.form.controls.fullname.setValue(contacts.fullname);
    this.form.controls.title.setValue(contacts.title);
    this.form.controls.phone.setValue(contacts.phone);
    this.form.controls.email.setValue(contacts.email);
    this.form.controls.dob.setValue(contacts.dob);
    this.form.controls.recordId.setValue(contacts.recordId);
    this.form.controls.profilePic.setValue(contacts.profilePic);

  }
}
