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
  recordId;
  contactname;
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
        const queryParamValue = params;
        this.recordId = queryParamValue.id;
        this.contactname = queryParamValue.name;
      });
  }
  makePayment() {
    if (this.amountForm.invalid) {
      return;
    }
    this.route.navigate(['/dashboard/donate/payment'], { queryParams: { amount: this.amountForm.value.amount, id: this.recordId } });
  }
}
