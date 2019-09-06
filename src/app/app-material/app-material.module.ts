import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatNativeDateModule} from '@angular/material/core';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  exports: [
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    BsDatepickerModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class AppMaterialModule { }
