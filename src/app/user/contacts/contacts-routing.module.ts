import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../service/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContributeComponent } from './contribute/contribute.component';



const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'donate', component: ContributeComponent, canActivate: [AuthGuard] },
  { path: 'donate/payment', loadChildren: () => import('../payment/payment.module').then(m => m.PaymentModule) },
  { path: '**', loadChildren: () => import('../../share-module/share-module.module').then(m => m.ShareModuleModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
