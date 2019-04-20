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

  signup(user: User){
    return this.http.post("http://localhost:8088/sign-up",user, {observe: 'response'})
    .pipe(
      map(
        res=> {
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
