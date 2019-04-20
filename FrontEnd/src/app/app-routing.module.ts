import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { LikedShopsComponent } from './liked-shops/liked-shops.component';
import { AuthGuardService } from './login/auth-guard.service';
import { LoginGuardService } from './login/login-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'likedShops',  component: LikedShopsComponent, canActivate: [AuthGuardService]},
  { path: 'login',  component: LoginComponent, canActivate: [LoginGuardService]},
  { path: 'shops',  component: ShopComponent, canActivate: [AuthGuardService]},
  { path: 'signup',  component: SignUpComponent},
  { path: '' , redirectTo: '/login', pathMatch:'full'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
