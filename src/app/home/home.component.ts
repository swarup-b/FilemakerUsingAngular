import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { FormgroupContactsService } from '../services/formgroup-contacts.service';

import { MatTableService } from '../services/mat-table.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { tap } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
  // @ViewChild('editForm', { static: false }) public editFormData: FormControl;
  // Variable declared
  value = '60%';
  divProerty: boolean;
  confirmBox: boolean;
  contacts: [];
  editForm: FormGroup;
  listData: MatTableDataSource<any>;
  totalRecord;
  isSubmitted = false;
  displayedColumns = ['id', 'title', 'fullname', 'email', 'phone', 'dob', 'Actions'];
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';
  canDeactivate: any;

  // Constructor
  constructor(
    private authService: AuthService,
    private service: LoginService,
    private router: Router,
    private groupService: FormgroupContactsService,
    private dialog: MatDialog,
    private matservice: MatTableService,
    private tosterService: ToastrService
  ) { }
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
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
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(NewContactComponent, dialogConfig);
  }

  // Edit Record
  editRecord(row) {
    this.divProerty = true;
    this.groupService.populateForm(row);
  }

  // Logout User
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
    this.tosterService.success('Logged Out..!');
  }

  // Delete Record
  deleteRecord(row) {
    this.openDialog('Are You Sure To Delete this record.');
    console.log(this.confirmBox);
    if (this.confirmBox) {
      this.service.deleteRecordById(row.recordId, this.url).subscribe(
        data => {
          console.log(data);
          this.getAllContactDetails(this.paginator.pageIndex, this.paginator.pageSize);
          this.tosterService.info('Deleted Successfully..');
        },
        error => {
          console.log(error);
        }
      );
    }
    this.confirmBox = false;
  }

  // Get all Contact Informations
  getAllContactDetails(index, size) {
    const newIndex = index * size;
    const newUrl = 'http://localhost/EmployeeRegistration/public/user/v1/report?start=' + newIndex + '&range=' + size;
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
    this.isSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.service.updateContacts(this.editForm.value, this.url).subscribe(
      response => {
        this.getAllContactDetails(this.paginator.pageIndex, this.paginator.pageSize);
        this.tosterService.success('Updated Successfully..');
      },
      error => {
        console.log(error);
      }
    );
    this.editForm.reset();
    this.onClose();
  }

  // Close Edit Division
  onClose() {
    if (this.editForm.dirty || this.confirmBox) {
      this.openDialog('Save Details.');
      if (this.confirmBox) {
        this.update();
      } else {
        this.divProerty = false;
      }
    } else {
      this.divProerty = false;
    }
    this.confirmBox = false;
    this.editForm.reset();
  }
  // custom confirm Dialog
  openDialog(message): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: message
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialog' + result);
        this.confirmBox = result;
      }
    });
  }
  get f() { return this.editForm.controls; }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
