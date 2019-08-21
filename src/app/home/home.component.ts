import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog , MatDialogConfig} from '@angular/material';
import { NewContactComponent } from '../new-contact/new-contact.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  contacts: [];
  listData: MatTableDataSource<any>;
  displayedColumns = ['photo', 'id', 'title', 'fullname', 'email', 'phone', 'dob', 'Actions'];
  private url = "http://localhost/EmployeeRegistration/public/contacts";
 

  constructor(
    private authService : AuthService,
    private service: LoginService, 
    private router: Router,
     private auth: AuthService ,
     private dialog :MatDialog
     ) { }

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    
    if (localStorage.getItem('key') != null) {

        this.service.getAllContacts(this.url).subscribe(
                    data => {
                      this.contacts = data as [];
                      this.listData = new MatTableDataSource(this.contacts);
                      this.listData.sort = this.sort;
                      this.listData.paginator = this.paginator;
                    },
                    error => {
                      if (error.status == 401) {
                        this.router.navigate(['login']);
                      }
                      console.log(error);
                    }
      );
    }
    else {
      this.router.navigate(['login']);
    }

  }
//Create new Contact
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(NewContactComponent,dialogConfig);
  }
  //Logout User
  logout(){
    this.authService.logout();
    this.router.navigate(['login']);

  }

  deleteRecord(recordId){
    
  }
}
