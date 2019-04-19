import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private signUpService: SignUpService, private router: Router) { }

  signUpform = new FormGroup({
    login : new FormControl('', [Validators.required, Validators.minLength(3)]),
    password : new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSignUp(){
    if(this.signUpform.valid)
      this.signUpService.signup(
        new User(this.signUpform.get('login').value, this.signUpform.get('password').value)
        ).subscribe(
          res => res,
          err => {
            console.log(err);
          }
        );

  }

  onSignIn(){
    this.router.navigate(['/login'])
  }
}
