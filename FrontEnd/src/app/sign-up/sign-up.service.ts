import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  isRegistred = false
  constructor(private http: HttpClient, private router: Router) { }

  //register a new user
  signup(user: User){
    return this.http.post(apiUrl+"/sign-up",user, {observe: 'response'})
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
