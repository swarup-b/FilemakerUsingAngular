import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  response: String;
  private url = "http://localhost/EmployeeRegistration/public/loginUser";
  constructor(private fb: FormBuilder, private service: LoginService, private router: Router) { }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });

  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
    this.service.loginUser(this.loginForm.value, this.url).subscribe(
      data => {
        if (data.error == 'Invalid email or password') {
          this.response = "Invalid email or password"
        } else {
          this.response = "";
          localStorage.setItem('key', data.token);
          this.router.navigate(['/home']);
        }
      }, // success path
      error => {
        if (error.status = 403) {
          this.response = "Enter a proper email"
        }
        console.log(error.status);
      } // error path
    );

  }

}
