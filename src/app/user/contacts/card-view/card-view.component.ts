import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  constructor(
    private _dashboardService: DashboardService,
    private _tostService: ToastrService,
    private _dialogService: ConfirmDialogService,
    public spinner: NgxSpinnerService,
    private _httpClient: HttpClient
  ) { }
  response;
  contacts;
  confirmBox: boolean;
  query: any;
  next = 0;
  nextRecord = true;

  ngOnInit() {
    this.getAllContact(this.next, 'init');
    this.spinner.show();
  }

  getAllContact(nextIndex, type) {
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts/allRecords?start=' + nextIndex + '&range=5';
    this._httpClient.get(url).subscribe(
      data => {
        if (type === 'init') {
          this.contacts = data as [];
          this.next = this.next + 5;
          this.spinner.hide();
        } else if (type === 'scroll' && this.nextRecord) {
          const records = data as [];
          if (records == null) {
            this.nextRecord = false;
            this.spinner.hide();
            return;
          }
          this.contacts = this.contacts.concat(data as []);
          this.next = this.next + 5;
          this.spinner.hide();
        }
      });
    this.spinner.hide();
  }

  onScroll() {
    this.spinner.show();
    this.getAllContact(this.next, 'scroll');
  }

  // Edit Record
  async editRecord(row) {
    this._dashboardService.editRecord(row);
  }
  // Delete Record
  async deleteRecord(row) {
    const res = await this.confirmDialog('Delete', 'Are you sure to delete this ?');
    if (res) {
      await this._dashboardService.deleteRecord(row);
      this._tostService.info('Deleted Successfully..');
    }
  }
  // Open Activity
  activity(row) {
    this._dashboardService.activity(row);
  }
  // custom confirm Dialog
  confirmDialog(titel, msg) {
    return this._dialogService.confirm(titel, msg)
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }

}
