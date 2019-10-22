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

import { MatInputModule } from '@angular/material';
import { SearchPipe } from '../pipes/search.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [ SearchPipe ],
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    BsDatepickerModule,
    MatTableModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SearchPipe,
    MatCardModule,
    MatSelectModule,
    MatRadioModule
  ]
})
export class AppMaterialModule { }
