import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    return localStorage.getItem('key');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    if (token != null) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.clear();
  }
}
