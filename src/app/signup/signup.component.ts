import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup, FormControl} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  constructor(private fb: FormBuilder , private service : LoginService) { }
  private url= "http://localhost/EmployeeRegistration/public/users";
  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['' , Validators.required],
      email: [''],
      password: [''],
      gender : ['']
  });
}

  onSubmit(){
    console.log(this.signupForm.value);
    this.service.loginUser(this.signupForm.value , this.url).subscribe(
      data =>  { console.log(data); }, // success path
      error => { console.log(error); } // error path
    );
    
  }

}
