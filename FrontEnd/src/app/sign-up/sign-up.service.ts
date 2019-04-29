import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  isRegistred = false
  constructor(private http: HttpClient, private router: Router) { }

  //register a new user
  signup(user: User){
    return this.http.post("http://localhost:8088/sign-up",user, {observe: 'response'})
    .pipe(
      map(
        res=> {
          //in case of successful registration, we redirect the user to login
          this.router.navigate(["/login"])
          this.isRegistred = true;
        },
        err => {
          console.log(err);
        }
      )
    );
  }
}
