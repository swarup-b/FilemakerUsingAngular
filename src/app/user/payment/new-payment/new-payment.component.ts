import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  paymentType = 'CreditCard';
  paymentStatus = true;
  amount = 0.0;
  paramvalue;
  contactId;
  creditCardForm: FormGroup;
  chequeForm: FormGroup;
  name;
  status;
  transactionId;
  transactionAmount;
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  product = {
    price: 50.00,
    description: 'Abcd'
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private apiService: ApiService,
    public spinner: NgxSpinnerService,
    private tostService: ToastrService
  ) { }

  ngOnInit() {
    this.spinner.hide();
    this.creditCardForm = this.fb.group({
      cardNo: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', Validators.required]
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
    if (type === 'Paypal') {
      this.paymentType = type;
    }

  }
  makePayment() {
    const url = 'http://localhost/EmployeeRegistration/public/user/v1/newPayment';
    if (this.creditCardForm.invalid) {
      return;
    }
    this.spinner.show();
    this.creditCardForm.value.amount = this.amount;
    this.creditCardForm.value.contactId = this.contactId;
    this.apiService.makePayment(url, this.creditCardForm.value).subscribe(
      data => {
        if (data.status === 'Successful') {
          this.transactionAmount = data.message.TransactionAmount;
          this.transactionId = data.message.TransactionId;
          this.status = data.message.TransactionStatus;
          this.name = this.creditCardForm.value.nameOnCard;
          this.paymentStatus = false;
        }
        if (data.status === 'fail') {
          console.log('fail');
        }
        if (data.status === 'error') {
          this.tostService.error(data.message.errors.error[0].errorText);
          console.log(data.message.errors.error[0].errorText);
        }
        this.spinner.hide();
      }
    );
  }
  get f() { return this.creditCardForm.controls; }
  get f1() { return this.creditCardForm.controls; }


}
