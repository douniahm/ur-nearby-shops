import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate, OnInit  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  isAuthenticated = false;

  constructor( public router: Router, private http: HttpClient) { }

  ngOnInit() {
    if(this.isUserLoggedIn() == true) this.isAuthenticated = true;
  }
  canActivate() {
    const log = this.isUserLoggedIn();
     if (log == false) {
      this.router.navigate(['login']);
  }
  return log;
}
authenticate(username, password) {
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
  return this.http.get('http://localhost:8088/validateLogin', {headers}).pipe(
   map(
     userData => {
      sessionStorage.setItem('username', username);
      this.isAuthenticated = true;
      return userData;
     }
   )

  );
}

isUserLoggedIn() {
  const user = sessionStorage.getItem('username');
  console.log(user);
  return !(user === null);
}

logOut() {
  sessionStorage.removeItem('username');
  sessionStorage.clear();
  this.isAuthenticated = false;
}
}

