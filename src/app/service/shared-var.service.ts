import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {
  value: boolean;
  isPageDirty: false;
  contactlist = new BehaviorSubject<any>(this.value);
  constructor() { }

  isDirty = new BehaviorSubject<any>(this.isPageDirty);
}
