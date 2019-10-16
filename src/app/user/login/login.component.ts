import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { SharedVarService } from '../../service/shared-var.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  response: string;
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/users/login';

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router,
    private toasterService: ToastrService,
    public dialog: MatDialog,
    private shareVar: SharedVarService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      type: ['Select', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  // Return form instance
  get f() { return this.loginForm.controls; }

  // Submit Form
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.service.loginUser(this.loginForm.value, this.url).subscribe(
      data => {
        if (data.error === 'Invalid email or password') {
          this.toasterService.error('Invalid email or password');
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('data', this.loginForm.value.type);
          this.router.navigate(['/dashboard']);
        }
      }, // success path
      error => {
        if (error.status === 403) {
          this.response = 'Error Occurred';
        }
        console.log(error);
      } // error path
    );

  }

}
