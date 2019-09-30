import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SharedVarService } from '../../../service/shared-var.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreateProfileComponent } from '../../create-profile/create-profile.component';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, AfterViewInit {
  url = 'http://localhost/EmployeeRegistration/public/user/v1/records';
  adminList: Array<any> = [];
  staffList: Array<any> = [];
  userList: Array<any> = [];
  constructor(
    private shareVar: SharedVarService,
    private dialog: MatDialog,
    private service: ApiService
  ) { }
  temp: string;
  user: string;
  ngOnInit() {
    this.user = localStorage.getItem('data');
    this.getRecordOnTableName();
  }

  ngAfterViewInit(): void {
    this.shareVar.upRecord.subscribe(
      data => {
        if (data) {
          this.getRecordOnTableName();
        }
      }
    );

  }
  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = { type: this.user };
    this.dialog.open(CreateProfileComponent, dialogConfig);
  }

  getRecordOnTableName() {
    const adminUrl = this.url + '/' + 'Employee';
    const staffUrl = this.url + '/' + 'Staff';
    const userUrl = this.url + '/' + 'User';
    if (this.user === 'Employee') {
      this.service.getRecordOnTableName(adminUrl).subscribe(
        response => {
          this.adminList = response as [];
          this.adminList.reverse();
        }
      );
    }
    if (this.user === 'Employee'|| this.user === 'Staff') {
      this.service.getRecordOnTableName(staffUrl).subscribe(
        response => {
          this.staffList = response as [];
          this.staffList.reverse();
        }
      );
    }
    this.service.getRecordOnTableName(userUrl).subscribe(
      response => {
        this.userList = response as [];
        this.userList.reverse();
      }
    );

  }
}

