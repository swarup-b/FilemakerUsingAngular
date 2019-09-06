import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { FormgroupContactsService } from '../services/formgroup-contacts.service';

import { MatTableService } from '../services/mat-table.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  value = '60%';
  divProerty: boolean;
  contacts: [];
  editForm: FormGroup;
  message = '';
  listData: MatTableDataSource<any>;
  displayedColumns = ['id', 'title', 'fullname', 'email', 'phone', 'dob', 'Actions'];
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/contacts';


  constructor(
    private authService: AuthService,
    private service: LoginService,
    private router: Router,
    private groupService: FormgroupContactsService,
    private dialog: MatDialog,
    private matservice: MatTableService
  ) { }

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.divProerty = false;
    if (localStorage.getItem('key') != null) {
      this.getAllContactDetails();
      this.editForm = this.groupService.form;
    } else {
      this.router.navigate(['login']);
    }
    this.matservice.contactlist.subscribe(response => {
      if (response) { this.getAllContactDetails(); }
    });


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

  }
  // Delete Record
  deleteRecord(row) {
    if (confirm('Are you sure to delete ')) {
      this.service.deleteRecordById(row.recordId, this.url).subscribe(
        data => {
          this.message = data.message;
          this.getAllContactDetails();
        }
      );
    }
  }
  // Get all Contact Informations
  getAllContactDetails() {
    this.service.getAllContacts(this.url).subscribe(
      data => {
        // this.matservice.contactlist.next(data as []);
        this.contacts = data as [];
        this.listData = new MatTableDataSource(this.contacts);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
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
    this.service.updateContacts(this.editForm.value, this.url).subscribe(
      response => {
        this.message = response.data;
        this.getAllContactDetails();
        this.onClose();
      },
      error => {
        console.log(error);
      }
    );

  }
  // Close Edit Division
  onClose() {
    this.divProerty = false;
  }
}
