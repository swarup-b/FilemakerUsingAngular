import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthGuard } from './service/guard/auth.guard';
import { CanDeactivateGuardService } from './service/guard/can-deactivate-guard.service';
import { UserInterceptorService } from './service/auth/user-interceptor.service';
import { ConfirmationDialogComponent } from './user/shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogService } from './service/confirm-dialog.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsModule } from './user/contacts/contacts.module';
// import { NewContactComponent } from './contacts/new-contact/new-contact.component';

import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './user/page-not-found/page-not-found.component';
import { SignupComponent } from './user/signup/signup.component';
import { NewContactComponent } from './user/contacts/new-contact/new-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ContactsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [AuthGuard,
    ConfirmDialogService,
    CanDeactivateGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  NewContactComponent,
  ConfirmationDialogComponent
  ]
})
export class AppModule { }
