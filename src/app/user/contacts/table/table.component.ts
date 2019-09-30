import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';
import { SharedVarService } from '../../../service/shared-var.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  contactResponse: any;
  confirmBox: boolean;
  spinner = false;
  contacts: [];
  editForm: FormGroup;
  listData: MatTableDataSource<any>;
  totalRecord;
  isSubmitted = false;
  displayedColumns = ['id', 'title', 'fullname', 'email', 'phone', 'dob', 'Actions', 'Activity'];
  canDeactivate: any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private matservice: SharedVarService,
    private tosterService: ToastrService,
    private dialogService: ConfirmDialogService
  ) { }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  // Init method
  ngOnInit() {
    this.matservice.contactlist.subscribe(response => {
      if (response) {
        this.getAllContactDetails(this.paginator.pageIndex, this.paginator.pageSize);
      }
    });


  }

  // Lifecycle Method AfterViewInit
  ngAfterViewInit() {
    this.paginator.page.pipe(
      startWith(null),
      tap(() => this.getAllContactDetails(this.paginator.pageIndex, this.paginator.pageSize))
    ).subscribe();

  }
  // Edit Record
  async editRecord(row) {
    this.dashboardService.editRecord(row);
  }
  // Delete Record
  async deleteRecord(row) {
    const res = await this.confirmDialog('Delete', 'Are you sure to delete this ?');
    if (res) {
      await this.dashboardService.deleteRecord(row);
      this.getAllContactDetails(this.paginator.pageIndex, this.paginator.pageSize);
      this.tosterService.info('Deleted Successfully..');
    }
  }

  // Get all Contact Informations
   async getAllContactDetails(index, size) {
    this.contactResponse =  await this.dashboardService.allRecords(index, size);
    this.totalRecord = this.contactResponse.headers.get('records');
    this.contacts = this.contactResponse.body;
    this.listData = new MatTableDataSource(this.contacts);
    this.listData.sort = this.sort;
  }
  activity(row) {
    this.dashboardService.activity(row);
  }
  // custom confirm Dialog
  confirmDialog(titel, msg) {
    return this.dialogService.confirm(titel, msg)
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }

}
