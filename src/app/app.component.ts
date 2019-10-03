import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from './service/api.service';
import { HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(
    public authService: AuthService,
    private router: Router,
    private tosterService: ToastrService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  config = {
    height: '5rem'
  };
  ngOnInit() {
  }
  // Logout User
  logout = () => {
    this.authService.logout();
    this.router.navigate(['login']);
    this.tosterService.success('Logged Out..!');
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    this.fileUploadProgress = '0%';
    const formData = new FormData();
    formData.append('file', this.fileData);
    console.log(formData);
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/upload';
    this.apiService.uploadImage(url, formData).subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);
        alert('SUCCESS !!');
      }
    });

  }
}
