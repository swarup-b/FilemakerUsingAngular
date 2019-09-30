import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



import { ContactsRoutingModule } from './contacts-routing.module';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { NewContactComponent } from './new-contact/new-contact.component';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModuleModule } from '../../share-module/share-module.module';
import { CardViewComponent } from './card-view/card-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [HomeComponent, TableComponent, NewContactComponent, CardViewComponent, DashboardComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ShareModuleModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ]
})
export class ContactsModule { }
