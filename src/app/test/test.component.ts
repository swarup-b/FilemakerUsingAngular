import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '../services/confirm.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private cdc: ConfirmService) { }

  ngOnInit() {
  }
  public async openConfirmationDialog() {
    const total = await this.confirmDialog();
    console.log('Insde cDialog');
  }

  confirmDialog() {
    return this.cdc.confirm('Please confirm..', 'Do you really want to Move with out saving the data ? ')
      .then((confirmed) => console.log('User confirmed:', confirmed))
      .catch((error) => console.log(error));
  }

}
