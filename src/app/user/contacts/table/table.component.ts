import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormService } from '../../../service/form.service';
import { SharedVarService } from '../../../service/shared-var.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  value = '60%';
  divProerty: boolean;
  confirmBox: boolean;
  spinner = false;
  contacts: [];
  editForm: FormGroup;
  listData: MatTableDataSource<any>;
  totalRecord;
  isSubmitted = false;
  displayedColumns = ['id', 'title', 'fullname', 'email', 'phone', 'dob', 'Actions'];
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';
  canDeactivate: any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private service: ApiService,
    private router: Router,
    private groupService: FormService,
    private matservice: SharedVarService,
    private tosterService: ToastrService,
    private dialogService: ConfirmDialogService
  ) { }

  // Init method
  ngOnInit() {
    this.divProerty = false;
    this.editForm = this.groupService.form;
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
    if (!this.editForm.pristine) {
      const res = await this.confirmDialog('Confirm', 'Are you sure to move without saving this ?');
      if (res) {
        this.divProerty = true;
        this.groupService.populateForm(row);
        this.editForm.markAsUntouched();
      }
    } else {
      this.divProerty = true;
      this.groupService.populateForm(row);
      this.editForm.markAsUntouched();
    }
  }
  // Delete Record
  async deleteRecord(row) {
    const res = await this.confirmDialog('Delete', 'Are you sure to delete this ?');
    if (res) {
      this.service.deleteRecordById(row.recordId, this.url).subscribe(
        data => {
          this.getAllContactDetails(this.paginator.pageIndex, this.paginator.pageSize);
          this.tosterService.info('Deleted Successfully..');
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  // Get all Contact Informations
  getAllContactDetails(index, size) {
    const newIndex = index * size;
    const newUrl = 'http://localhost/EmployeeRegistration/public/user/v1/contacts/allRecords?start=' + newIndex + '&range=' + size;
    this.service.getAllContacts(newUrl).subscribe(
      (response) => {
        this.totalRecord = response.headers.get('records');
        this.contacts = response.body;
        this.listData = new MatTableDataSource(this.contacts);
        this.listData.sort = this.sort;
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        console.log(error);
      }
    );
  }
  // custom confirm Dialog
  confirmDialog(titel, msg) {
    return this.dialogService.confirm(titel, msg)
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }

}
