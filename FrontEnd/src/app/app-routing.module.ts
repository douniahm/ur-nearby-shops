import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { LoginService } from './login/login.service';

const routes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: 'shops',  component: ShopComponent, canActivate: [LoginService]},
  { path: '' , redirectTo: '/login', pathMatch:'full'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
