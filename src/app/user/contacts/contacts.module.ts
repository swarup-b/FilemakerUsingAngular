import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



import { ContactsRoutingModule } from './contacts-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TableComponent } from './table/table.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { CardViewComponent } from './card-view/card-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [TableComponent, NewContactComponent, CardViewComponent, DashboardComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatFormFieldModule,
    AppMaterialModule,
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
