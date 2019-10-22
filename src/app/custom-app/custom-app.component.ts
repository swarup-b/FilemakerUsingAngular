import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    template: `<p> Hii i am custom component {{name}} and my age is {{age}}</p>`,
    styles: [],
    encapsulation: ViewEncapsulation.Native

})
export class CustomAppComponent {
    @Input() name: string;
    @Input() age: number;
}