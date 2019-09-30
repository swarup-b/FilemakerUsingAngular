import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private tosterService: ToastrService
  ) { }

   config = {
    height: '5rem'
  };
  // Logout User
  logout = () => {
    this.authService.logout();
    this.router.navigate(['login']);
    this.tosterService.success('Logged Out..!');
  }
}
