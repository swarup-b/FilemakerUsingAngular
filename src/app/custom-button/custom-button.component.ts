import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  template: `
    <p>
      custom-button works!
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.Native
})
export class CustomButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
