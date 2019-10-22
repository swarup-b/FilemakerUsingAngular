import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  amountForm: FormGroup;
  operators = ['BSNL', 'Vodafone', 'jio', 'Airtel', 'Idea', 'TATA Docomo'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit() {
    this.amountForm = this.fb.group({
      amount: ['', Validators.required]
    });
    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"
      });
  }
  makePayment() {
    if (this.amountForm.invalid) {
      return;
    }
    this.route.navigate(['/dashboard/donate/payment'], { queryParams: { amount: this.amountForm.value.amount, id: 112 } });
  }
}
