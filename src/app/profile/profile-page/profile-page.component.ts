import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
   // Strings for translation - optional
   messages = {
    validDate: 'valid\ndate', // optional - default 'valid\nthru'
    monthYear: 'mm/yyyy', // optional - default 'month/year'
};

// Default placeholders for rendered fields - optional
placeholders = {
    number: '•••• •••• •••• ••••',
    name: 'Full Name',
    expiry: '••/••',
    cvc: '•••'
};

masks = {
    cardNumber: '•' // optional - mask card number
};
  ngOnInit(): void {

  }

}
