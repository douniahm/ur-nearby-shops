import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  //sign-up form
  signUpform = new FormGroup({
    login : new FormControl('', [Validators.required, Validators.minLength(3)]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword : new FormControl('', [Validators.required, Validators.minLength(6)])
  }, this.passwordMatchValidator);

  constructor(private signUpService: SignUpService, private router: Router) {
  }

  //validate confirm password
  passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('confirmPassword').value
       ? null : {'mismatch': true};
 }
  //sign-up: register new user
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

  //redirect user to sign in view
  onSignIn(){
    this.router.navigate(['/login'])
  }
}
