import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = ''
  password = ''
  invalidLogin = false

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) {
  }

  onLogin() {
    (this.loginService.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['/shops'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      }
    )
    );
  }
}
