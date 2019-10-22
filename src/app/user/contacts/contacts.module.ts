import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



import { ContactsRoutingModule } from './contacts-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableComponent } from './table/table.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule} from 'ngx-spinner';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { CardViewComponent } from './card-view/card-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContributeComponent } from './contribute/contribute.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [TableComponent, NewContactComponent, CardViewComponent, DashboardComponent, ContributeComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatFormFieldModule,
    AppMaterialModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ShareModuleModule,
    NgbModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ]
})
export class ContactsModule { }
