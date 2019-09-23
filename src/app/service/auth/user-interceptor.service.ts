import { Injectable } from '@angular/core';
import {  HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInterceptorService {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: ` ${this.authService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
