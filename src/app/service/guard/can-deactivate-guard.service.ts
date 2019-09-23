import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HomeComponent } from '../../user/contacts/home/home.component';
import { ConfirmDialogService } from '../confirm-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<HomeComponent> {

  confirmBox: boolean;  // Confirm Dialog variable

  constructor(private dialogService: ConfirmDialogService) { } // Constructor

  async canDeactivate(component: HomeComponent): Promise<boolean> {
    if (component.editForm.dirty) {
      await this.confirmDialog();
      if (!this.confirmBox) {
        return false;
      }
    }
    component.editForm.reset();
    return true;
  }
// Confirom dialogbox
   confirmDialog() {
    return this.dialogService.confirm('Confirm..', 'Do you really want to move without saving the data?')
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }
}
