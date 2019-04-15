import { Injectable, OnInit } from '@angular/core';
import { Shop } from '../models/shop';
import * as faker from 'faker/locale/fr'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShopService implements OnInit{

  shops: Shop[];
  isAuthenticated = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.getFakeShops();
      console.log(this.shops);
  }

  getFakeShops(){
    this.shops = new Array(10)
    .fill(1)
      .map((e, i) => {
        return {
          id: 0,//
          nom: faker.lorem.word(),
          distance: faker.random.number({'min': 1,
          'max': 30}),
          email: faker.internet.email(),
          tel: faker.phone.phoneNumber()
        };
      });
     this.sortShops(this.shops);
    return this.shops;
  }
  generateFakeShop(){
    this.shops.push({
      id: 0,//
      nom: faker.lorem.word(),
      distance: faker.random.number({'min': 1,'max': 30}),
      email: faker.internet.email(),
      tel: faker.phone.phoneNumber()
    });
    this.sortShops(this.shops);

  }

  sortShops(shops:any){
    console.log(shops);
    shops.sort((a,b)=>{
      return a.distance - b.distance;
    });
    //return shops;
  }
  deleteFakeShop(shop: Shop){
    let index = this.shops.indexOf(shop);
    this.shops.splice(index,1);
    console.log(this.shops);
  }

  getShops(motCle:string, page:number, size:number){
    return this.http.get("http://localhost:8088/chercherShops?mc="+motCle+"&size="+size+"&page="+page,);
  }

  getShop(id:number){
    return this.http.get("http://localhost:8088/shops/"+id);
  }

  saveShop(shop: Shop){
    return this.http.post("http://localhost:8088/user/shop",shop); //retourne l objet inseré
  }

  updateShop(shop: Shop){
    return this.http.put("http://localhost:8088/shops/"+shop.id,shop);
  }
  deleteShop(id:number){
    let username='shops'
    let password='shops'

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.delete("http://localhost:8088/shops/"+id,{headers});
  }
}
