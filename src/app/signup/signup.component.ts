import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private service: LoginService) { }
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/users';
  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      password: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit() {
    this.service.signup(this.signupForm.value, this.url).subscribe(
      data => { }
    );

  }

}
