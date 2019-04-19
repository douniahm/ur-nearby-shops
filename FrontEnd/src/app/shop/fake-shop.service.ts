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

  sortShops(shops:any){
    shops.sort((a,b)=>{
      return a.distance - b.distance;
    });
  }
  deleteFakeShop(shop: Shop){
    let index = this.shops.indexOf(shop);
    this.shops.splice(index,1);
  }
}