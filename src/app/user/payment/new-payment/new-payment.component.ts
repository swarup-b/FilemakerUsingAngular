import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  paymentType = 'CreditCard';
  amount = 0.0;
  paramvalue;
  contactId;
  creditCardForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      cardNo: ['', Validators.required],
      year: ['', Validators.required],
      month: ['', Validators.required],
      cvv: ['', Validators.required],
      nameOnCard: ['', Validators.required]
    });
    this.activatedRoute.queryParams.subscribe(data => {
      this.contactId = data.id;
      this.amount = data.amount;
    }, error => {
      console.log(error);
    });
  }
  changePaymentType(type) {
    if (type === 'CreditCard') {
      this.paymentType = type;
    }
    if (type === 'Cheque') {
      this.paymentType = type;
    }
    if (type === 'UPI') {
      this.paymentType = type;
    }

  }
  makePayment() {
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/newPayment';
    if (this.creditCardForm.invalid) {
      return;
    }
    this.creditCardForm.value.amount = this.amount;
    this.creditCardForm.value.contactId = this.contactId;
    this.httpClient.post(url, this.creditCardForm.value).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
