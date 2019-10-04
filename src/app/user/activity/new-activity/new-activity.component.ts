import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';


@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {
  activity: FormGroup;
  isSubmitted = false;
  activityList: Array<any> = [];
  private url = 'http://localhost/EmployeeRegistration/public/user/v1/activities';
  query: any;
  confirmBox: any;



  constructor(
    private _fb: FormBuilder,
    private _tostService: ToastrService,
    private _service: ApiService,
    private _dialogService: ConfirmDialogService,
    private _matDlgRef: MatDialogRef<NewActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.activity = this._fb.group(
      {
        activities: ['']
      }
    );
    this.getAllActivity();

  }
  // Create New Activity
  createActivity() {
    const mydate = new Date();
    const d = new Date(mydate);
    const date = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const newDtae = new Date(date);
    this.activity.value.ActivityDate = newDtae;
    const newUrl = this.url + '/' + this.data.id;
    this._service.createActivity(newUrl, this.activity.value).subscribe(
      response => {
        if (response.data === 'Successful') {
          this.activity.reset();
          this.activity.markAsPristine();
          this._tostService.success('Created Successfully..');
          this.getAllActivity();
        } else {
          console.log(response);
        }
      });
  }

  // Get All Activity
  getAllActivity() {
    const newUrl = this.url + '/' + this.data.id;
    this._service.activities(newUrl).subscribe(
      response => {
        this.activityList = response as [];
        this.activityList.reverse();

      }
    );

  }

  // Close Modal
  async onClose() {
    if (!this.activity.pristine) {
      const res = await this.confirmDialog('Error', 'Are sure to Move, without Saving');
      if (!res) {
        return;
      }
      this.activity.reset();
      this._matDlgRef.close();
    } else {

      this._matDlgRef.close();
    }

  }
  get f() { return this.activity.controls; }
  // custom confirm Dialog
  confirmDialog(titel, msg) {
    return this._dialogService.confirm(titel, msg)
      .then((confirmed) => this.confirmBox = confirmed)
      .catch((error) => console.log(error));
  }
}