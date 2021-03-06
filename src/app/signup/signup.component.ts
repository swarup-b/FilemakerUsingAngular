import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private tosterService: ToastrService,
    private router: Router
  ) { }
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/users';
  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.service.signup(this.url, this.signupForm.value).subscribe(
      response => {
        if (response.data === 'Email Already Exist') {
          this.tosterService.error(response.data);
        } else if (response.data === 'Successful') {
          this.tosterService.success('Successfully Registered Please Login to Proceed.');
          this.router.navigate(['/login']);
        } else {
          console.log(response);
          this.router.navigate(['/error']);
        }

      },
      error => { console.log(error); }
    );

  }
  get f() { return this.signupForm.controls; }

}
