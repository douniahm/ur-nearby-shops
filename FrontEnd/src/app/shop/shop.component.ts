import { Component, OnInit } from '@angular/core';
import { Shop } from '../models/shop';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shops: Shop[];


  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.shops = this.shopService.getFakeShops();
  }

  //unused
  onShops(){
    this.shops = this.shopService.getFakeShops();
  }

  onLike(shop:Shop){
    this.shopService.saveShop(shop)
   .subscribe(data =>{
     this.shopService.deleteFakeShop(shop);
     this.shopService.generateFakeShop();
  }, err=>{
    console.log(err);
  })
  }

  onDislike(shop:Shop){
    this.shopService.deleteFakeShop(shop);
    this.shopService.generateFakeShop();
  }


}
