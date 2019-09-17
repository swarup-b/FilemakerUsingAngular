import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isValid: boolean;
  constructor() { }

  getToken() {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.clear();
  }
}
