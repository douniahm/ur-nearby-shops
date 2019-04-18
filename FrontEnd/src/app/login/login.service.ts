import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment  from 'moment';



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
authenticate(user) {
  return this.http.post("http://localhost:8088/api/login", user, {observe: 'response'})
  .pipe(
    map(
      res => this.setSession(res),
      err => err
    ));
}

private setSession(authResult) {
  if (authResult.status == 200) {
    const id_token = authResult.headers.get("Authorization");
    const expires_at = authResult.headers.get("expiresAt");
    const expiresAt = moment().add(expires_at, 'second');
    localStorage.setItem('id_token', id_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.router.navigate(['/shops']);
  }
}
isUserLoggedIn() {
   return moment().isBefore(this.getExpiration());
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}

logOut() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  this.router.navigate(['/login']);
}
}

