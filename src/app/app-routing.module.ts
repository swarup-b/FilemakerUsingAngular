import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './user/page-not-found/page-not-found.component';

import { SignupComponent } from './user/signup/signup.component';
import { AuthGuard } from './service/guard/auth.guard';
import { CanDeactivateGuardService } from './service/guard/can-deactivate-guard.service';





const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', loadChildren: '../app/user/contacts/contacts.module#ContactsModule'},
 // { path: 'home', component: HomeComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
