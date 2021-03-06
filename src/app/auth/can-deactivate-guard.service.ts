import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ConfirmService } from '../services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<HomeComponent> {

  confirmBox: boolean;  // Confirm Dialog variable

  constructor(private dialogService: ConfirmService) { } // Constructor

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
