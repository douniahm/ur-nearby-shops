import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as faker from 'faker/locale/fr'
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root'
})
export class FakeShopService {
  shops: Shop[];
  isAuthenticated = false;
  constructor(private http: HttpClient) { }

  //generate 10 shops to show in home page
  getFakeShops(): Shop[]{
    this.shops = new Array(10)
    .fill(1)
      .map((e, i) => {
        return {
          id: 0,
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

  //generate one shop to replace desliked  or liked shop
  generateFakeShop(){
    this.shops.push({
      id: 0,
      nom: faker.lorem.word(),
      distance: faker.random.number({'min': 1,'max': 30}),
      email: faker.internet.email(),
      tel: faker.phone.phoneNumber()
    });
    this.sortShops(this.shops);
  }

  //order shops by distance
  sortShops(shops:any){
    shops.sort((a,b)=>{
      return a.distance - b.distance;
    });
  }
  //delete disliked shop from home page
  deleteFakeShop(shop: Shop){
    let index = this.shops.indexOf(shop);
    this.shops.splice(index,1);
  }
}
