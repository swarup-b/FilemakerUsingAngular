import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ]
})
export class ProfileModule { }
