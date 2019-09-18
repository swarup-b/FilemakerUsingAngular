import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


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
    private service: LoginService,
    private router: Router,
    private toasterService: ToastrService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
          this.response = '';
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
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
