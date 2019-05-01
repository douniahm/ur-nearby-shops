import { Component, OnInit } from '@angular/core';
import { Shop } from '../models/shop';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shops: any;
  page:number = 0;
  totalPages:Array<any>;
  currentPage: number=0;
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.doSearch();
  }

  //get 3 shops by page
  doSearch(): void{
    this.shopService.getShops(this.currentPage)
    .subscribe(res=>{
      this.shops = res;
      this.totalPages = new Array(this.shops.totalPages);
      this.shops = this.shops.content;
    }, err =>{
      console.log(err);
    });
  }

  onLike(shop:Shop){
    //add shop to user's liked shops
    this.shopService.likeShop(shop)
   .subscribe(data =>{
     //remove liked shop from home page
     this.deleteShopFromHome(shop);
  }, err=>{
    console.log(err);
  })
  }

  onDislike(shop:Shop){
    //remove liked shop from home page
    this.deleteShopFromHome(shop);
  }

  gotoPage(i:number){
    this.currentPage=i;
    this.doSearch();
  }

  //delete disliked or liked shop from home page
  deleteShopFromHome(shop: Shop){
    let index = this.shops.indexOf(shop);
    this.shops.splice(index,1);
  }
}
