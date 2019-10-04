import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ConfirmDialogService } from '../confirm-dialog.service';
import { DashboardComponent } from 'src/app/user/contacts/dashboard/dashboard.component';
import { NewContactComponent } from 'src/app/user/contacts/new-contact/new-contact.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<NewContactComponent> {

  confirmBox: boolean;  // Confirm Dialog variable

  constructor(private dialogService: ConfirmDialogService) { } // Constructor

  async canDeactivate(component: NewContactComponent): Promise<boolean> {
    if (component.newContact.dirty) {
      await this.confirmDialog();
      if (!this.confirmBox) {
        return false;
      }
    }
    component.newContact.reset();
    return true;
  }
// Confirom dialogbox
   confirmDialog() {
    return this.dialogService.confirm('Confirm..', 'Do you really want to move without saving the data?')
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }
}
