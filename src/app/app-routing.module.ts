import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginGuard } from './service/guard/login.guard';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
// import { DashboardComponent } from './user/contacts/dashboard/dashboard.component';
// import { AuthGuard } from './service/guard/auth.guard';





const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'home', component: ProfilePageComponent},
  { path: 'profile', loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'dashboard', loadChildren: '../app/user/contacts/contacts.module#ContactsModule' },
  { path: 'activity', loadChildren: () => import('./user/activity/activity.module').then(mod => mod.ActivityModule) },
  { path: '**', loadChildren: () => import('./share-module/share-module.module').then(mod => mod.ShareModuleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
