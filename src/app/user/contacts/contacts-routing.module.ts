import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../../service/guard/auth.guard';
import { CanDeactivateGuardService } from '../../service/guard/can-deactivate-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
