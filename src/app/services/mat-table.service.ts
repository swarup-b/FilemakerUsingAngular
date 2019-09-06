import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MatTableService {
  value: boolean;
  contactlist = new BehaviorSubject<any>(this.value);
  constructor() { }


}
