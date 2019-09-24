import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  isValidate(formInstance, fieldName: any, isSubmitted) {
    return formInstance.fieldName.invalid && (formInstance.fieldName.dirty || isSubmitted);
  }
  isValidateError(formInstance, fieldName: any) {
    return formInstance.fieldName;
  }
}
