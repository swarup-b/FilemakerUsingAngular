import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { MatDialog } from '@angular/material';


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
    private _dialog: MatDialog
  ) { }
  response;
  contacts: [];
  confirmBox: boolean;
  query: any;

  ngOnInit() {
    this.getAllContact();
  }

  async getAllContact() {
    this.response = await this._dashboardService.allRecords(0, 5);
    this.contacts = this.response.body;
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
