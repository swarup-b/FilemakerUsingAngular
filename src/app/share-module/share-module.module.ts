import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModuleRoutingModule } from './share-module-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    ShareModuleRoutingModule
  ],
  exports : [PageNotFoundComponent]
})
export class ShareModuleModule { }
