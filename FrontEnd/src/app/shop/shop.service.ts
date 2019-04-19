import { Injectable } from '@angular/core';
import { Shop } from '../models/shop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShopService{

  shops: Shop[];

  constructor(private http: HttpClient) { }

  getLikedShops(motCle:string, page:number, size:number){
    return this.http.get("http://localhost:8088/liked-shops?mc="+motCle+"&size="+size+"&page="+page,);
  }

  saveShop(shop: Shop){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  };
  return this.http.post<Shop>("http://localhost:8088/like-shop", shop, httpOptions)
  .pipe(
    map(
      res => console.log("res"+ res),
      err => console.log("err"+err)
    ));
  }

  deleteShop(shop: Shop){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  };
  return this.http.delete<Shop>("http://localhost:8088/unlike-shop/"+shop.id, httpOptions)
  .pipe(
    map(
      res => console.log("res"+ res),
      err => console.log("err"+err)
    ));
  }

  sortShops(shops:any){
    console.log(shops);
    shops.sort((a,b)=>{
      return a.distance - b.distance;
    });
  }
}
