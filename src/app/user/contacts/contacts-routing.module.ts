import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../service/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', loadChildren: () => import('../../share-module/share-module.module').then(m => m.ShareModuleModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
