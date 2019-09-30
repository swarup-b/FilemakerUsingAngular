import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewActivityComponent } from './new-activity/new-activity.component';

const routes: Routes = [
  { path: '', component: NewActivityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
