import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';

  constructor(public loginService: LoginService, private http: HttpClient, private router: Router) {
    this.loginService.authenticate(undefined);
  }
  OnlogOut() {
   this.loginService.logout();
   this.router.navigate(['/login']);
  }
}
