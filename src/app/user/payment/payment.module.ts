import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';

import { PaymentRoutingModule } from './payment-routing.module';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'ngx-card/ngx-card';
import { NgxSpinnerModule} from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
// import { NgXCreditCardsModule } from 'ngx-credit-cards';


@NgModule({
  declarations: [NewPaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    CardModule,
    NgxSpinnerModule,
    ToastrModule
   // NgXCreditCardsModule
  ]
})
export class PaymentModule { }
