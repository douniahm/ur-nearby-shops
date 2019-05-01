import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment  from 'moment';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  constructor( public router: Router, private http: HttpClient) { }

  //authenticate user and stock token in local storage
authenticate(user) {
  return this.http.post(apiUrl+"/login", user, {observe: 'response'})
  .pipe(
    map(
      res => this.setSession(res),
      err => console.log(err)
    ));
}

//stock token in local storage after successful authentication
private setSession(authResult) {
  if (authResult.status == 200) {
    const id_token = authResult.headers.get("Authorization");
    const expires_at = authResult.headers.get("expiresAt");
    const expiresAt = moment().add(expires_at, 'second');
    const deslikedShops = ["0"];
    localStorage.setItem('id_token', id_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("deslikedShops", JSON.stringify(deslikedShops));
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

/*Log out by removing token from local storage and redirecting user to login view */
logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("deslikedShops");
  this.router.navigate(['/login']);
}
}

