import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { SharedVarService } from '../../../service/shared-var.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private shareVar: SharedVarService
  ) { }

  ngOnInit() {
  }


  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.data = { type: 'create' };
    this.dialog.open(NewContactComponent, dialogConfig);
  }

}
