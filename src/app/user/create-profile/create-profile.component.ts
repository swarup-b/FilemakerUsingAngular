import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/service/api.service';
import { SharedVarService } from 'src/app/service/shared-var.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfilePageComponent } from '../profile/profile-page/profile-page.component';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  createProfile: FormGroup;
  isSubmitted = false;
  sel: string;
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/users';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: ApiService,
    private tosterService: ToastrService,
    private shared: SharedVarService,
  ) { }

  ngOnInit() {
    this.createProfile = this.fb.group({
      type: ['Select', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required]
    });
    this.sel = this.data.type;
    console.log(this.data.type);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.createProfile.invalid) {
      return;
    }
    this.service.signup(this.url, this.createProfile.value).subscribe(
      response => {
        if (response.data === 'Email Already Exist') {
          this.tosterService.error(response.data);
        } else if (response.data === 'Successful') {
          this.shared.upRecord.next(true);
          this.tosterService.success('Successfully Created');
          this.onClose();
        } else {
          console.log(response);
        }

      },
      error => { console.log(error); }
    );

  }

  onClose() {
    this.dialogRef.close();
  }
  get f() { return this.createProfile.controls; }
}
