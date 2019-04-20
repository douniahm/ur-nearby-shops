import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from '../models/user';
import { SignUpService } from '../sign-up/sign-up.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username = ''
  password = ''
  invalidLogin = false;
  isRegistred = false;

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router,
     private signupService: SignUpService) {
  }

  ngOnInit() {
    if(this.signupService.isRegistred) {
      this.isRegistred = true
      this.signupService.isRegistred = false
    }
  }

  onLogin() {
    this.loginService.authenticate(new User(this.username, this.password)).subscribe(
      result => {
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
      }
    );
  }
}
