import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  authenticated = false;

  constructor( public router: Router, private http: HttpClient) { }
  canActivate() {
    const log = this.isUserLoggedIn();
     if (log !== true) {
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
      this.authenticated = true;
      return userData;
     }
   )

  );
}

isUserLoggedIn() {
  const user = sessionStorage.getItem('username');
  console.log(!(user === null));
  return !(user === null);
}

logOut() {
  sessionStorage.removeItem('username');
  sessionStorage.clear();
  this.authenticated = false;
}
}

