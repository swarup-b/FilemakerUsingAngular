import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from 'src/app/service/auth/auth.service';

import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormService } from '../../../service/form.service';
import { SharedVarService } from '../../../service/shared-var.service';

import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { startWith, tap } from 'rxjs/operators';
import { NewContactComponent } from '../new-contact/new-contact.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

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
    private authService: AuthService,
    private service: ApiService,
    private router: Router,
    private groupService: FormService,
    private dialog: MatDialog,
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

  // Create new Contact
  async onCreate() {
    if (!this.editForm.pristine) {
      const res = await this.confirmDialog('Confirm', 'Are you sure to move without saving this ?');
      if (res) {
        this.editForm.markAsPristine({ onlySelf: true });
      } else {
        return;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    this.dialog.open(NewContactComponent, dialogConfig);
  }

  // Edit Record
  async editRecord(row) {
    if (!this.editForm.pristine) {
      const res = await this.confirmDialog('Confirm', 'Are you sure to move without saving this ?');
      if (res) {
        this.divProerty = true;
        this.groupService.populateForm(row);
        this.editForm.markAsPristine({ onlySelf: true });
      } else {
        return;
      }
    }
    this.divProerty = true;
    this.groupService.populateForm(row);
    this.editForm.markAsPristine({ onlySelf: true });

  }

  // Logout User
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
    this.tosterService.success('Logged Out..!');
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

  // Update Table Record
  update() {
    const value1 = this.editForm.value;
    const OldDob = this.editForm.value.dob;
    const d = new Date(OldDob);
    const date = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const date1 = new Date(date);
    this.editForm.value.dob = date1;
    this.spinner = true;
    this.isSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.service.updateContacts(this.editForm.value, this.url).subscribe(
      response => {
        this.getAllContactDetails(this.paginator.pageIndex, this.paginator.pageSize);
        this.tosterService.success('Updated Successfully..');
        this.editForm.markAsPristine({ onlySelf: true });
        this.spinner = false;
      },
      error => {
        console.log(error);
      }
    );
    this.divProerty = false;
  }

  // Close Edit Division
  async onClose() {
    if (!this.editForm.pristine) {
      const res = await this.confirmDialog('Upadate', 'Are you sure to move with out saving data ?');
      if (res) {
        this.divProerty = false;
        this.editForm.markAsPristine({ onlySelf: true });
      }
    } else {
      this.divProerty = false;
    }

  }
  // custom confirm Dialog
  confirmDialog(titel, msg) {
    return this.dialogService.confirm(titel, msg)
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }

  // Numeric field validations
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // Get the form instance
  get f() { return this.editForm.controls; }
}
