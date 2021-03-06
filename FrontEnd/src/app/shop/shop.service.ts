import { Injectable } from '@angular/core';
import { Shop } from '../models/shop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ShopService{

  shops: Shop[];

  constructor(private http: HttpClient) { }

  //get shops
  getShops(page:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
      };
    return this.http.get(apiUrl+"/shops?page="+page);
  }

  //get user's liked shop
  getLikedShops(motCle:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
      };
    return this.http.get(apiUrl+"/liked-shops?mc="+motCle,httpOptions);
  }

  //add a shop to user's liked shops
  likeShop(shop: Shop){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  };
  return this.http.post<Shop>(apiUrl+"/like-shop", shop, httpOptions)
  .pipe(
    map(
      res => res,
      err => console.log("err"+err)
    ));
  }

  //remove shop from user's liked shop list
  unlikeShop(shop: Shop){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  };
  return this.http.post<Shop>(apiUrl+"/unlike-shop/"+shop.id, httpOptions)
  .pipe(
    map(
      res => res,
      err => console.log("err"+err)
    ));
  }
}
