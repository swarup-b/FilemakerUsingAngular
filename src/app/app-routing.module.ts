import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';



const routes: Routes = [
  {path : '' , component: LoginComponent},
  {path : 'login' , component : LoginComponent},
  {path : 'signup' , component : SignupComponent},
  {path : 'home' , component : HomeComponent},
  {path : 'new' , component : TestComponent},
  {path : '**' , component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
