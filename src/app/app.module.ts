import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ShareModuleModule } from './share-module/share-module.module';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { NewContactComponent } from './user/contacts/new-contact/new-contact.component';
import { ActivityModule } from './user/activity/activity.module';

import { NewActivityComponent } from './user/activity/new-activity/new-activity.component';
import { ProfileModule } from './user/profile/profile.module';
import { CreateProfileComponent } from './user/create-profile/create-profile.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';

import { CustomButtonComponent } from './custom-button/custom-button.component';
import { createCustomElement } from '@angular/elements';
import { CustomAppComponent } from './custom-app/custom-app.component';
import {CardModule} from 'ngx-card/ngx-card';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ConfirmationDialogComponent,
    CreateProfileComponent,
    ProfilePageComponent,
    CustomButtonComponent,
    CustomAppComponent
  ],
  imports: [
    BrowserModule,
    NgxEditorModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    CardModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ProfileModule,
    ActivityModule,
    ShareModuleModule,
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
    ConfirmationDialogComponent,
    NewActivityComponent,
    CreateProfileComponent,
    CustomAppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private _injector: Injector) {
    const customEle = createCustomElement(CustomAppComponent, { injector: this._injector });
    customElements.define('custom-app', customEle);
  }

  ngDoBootstrap() { }
}
