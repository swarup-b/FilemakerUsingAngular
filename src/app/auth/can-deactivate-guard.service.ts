import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<HomeComponent> {
  confirmBox = true;
  constructor(private dialog: MatDialog) { }
  canDeactivate(component: HomeComponent): boolean {
    if (component.editForm.dirty) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Are You sure to move without Saving the data ?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return false;
        }
      });
    }
    return true;
  }

  openDialog(message): boolean {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: message
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        return true;
      }
    });
    return false;
  }
}
