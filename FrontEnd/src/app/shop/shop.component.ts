import { Component, OnInit } from '@angular/core';
import { Shop } from '../models/shop';
import { ShopService } from './shop.service';
import { FakeShopService } from './fake-shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shops: Shop[];
  constructor(private shopService: ShopService, private fakeShopService: FakeShopService) { }
  ngOnInit() {
    this.shops = this.fakeShopService.getFakeShops();
  }

  onLike(shop:Shop){
    //add shop to user's liked shops
    this.shopService.saveShop(shop)
   .subscribe(data =>{
     //remove liked shop from home page
     this.fakeShopService.deleteFakeShop(shop);
     //replace it with another one
     this.fakeShopService.generateFakeShop();
  }, err=>{
    console.log(err);
  })
  }

  onDislike(shop:Shop){
    //remove liked shop from home page
    this.fakeShopService.deleteFakeShop(shop);
    //replace it with another one
    this.fakeShopService.generateFakeShop();
  }


}
