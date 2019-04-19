import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;
  constructor( public router: Router, private http: HttpClient, private loginService: LoginService) { }

  canActivate() {
     if (this.loginService.isUserLoggedIn() ) {
      return true;
  }
  this.router.navigate(['login']);
  return false
}
}
