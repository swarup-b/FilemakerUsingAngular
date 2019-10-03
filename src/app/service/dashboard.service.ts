import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FormService } from './form.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { NewActivityComponent } from '../user/activity/new-activity/new-activity.component';
import { NewContactComponent } from '../user/contacts/new-contact/new-contact.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  response;
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';
  constructor(
    private apiService: ApiService,
    private formService: FormService,
    private dialog: MatDialog
  ) { }

  editRecord(row) {
    this.formService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '45%';
    dialogConfig.data = { type: 'update', contactID: row.recordId , imgPath : row.profilePic };
    //  console.log(row.picture);
    this.dialog.open(NewContactComponent, dialogConfig);
  }
  async allRecords(index, size) {
    const newIndex = index * size;
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts/allRecords?start=' + newIndex + '&range=' + size;
    await this.apiService.allContacts(url).then(
      res => {
        this.response = res;
      }
    );
    return this.response;
  }
  deleteRecord(row) {
    return this.apiService.deleteRecordById(row.recordId, this.url).subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    );
  }
  // Open Activity
  activity(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1200px';
    console.log(row);
    dialogConfig.data = { id: row.recordId, name: row.fullname };
    this.dialog.open(NewActivityComponent, dialogConfig);
  }
}
