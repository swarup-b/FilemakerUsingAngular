import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private route: Router, private authService: AuthService) { }
  canActivate() {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    this.route.navigate(['/dashboard']);
    return false;
  }
}
