import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';

import { ActivityRoutingModule } from './activity-routing.module';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewActivityComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FlexLayoutModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ]
})
export class ActivityModule { }
