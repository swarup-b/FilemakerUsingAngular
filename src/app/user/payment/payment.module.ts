import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';

import { PaymentRoutingModule } from './payment-routing.module';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgXCreditCardsModule } from 'ngx-credit-cards';


@NgModule({
  declarations: [NewPaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
   // NgXCreditCardsModule
  ]
})
export class PaymentModule { }
