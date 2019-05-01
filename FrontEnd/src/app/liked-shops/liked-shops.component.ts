import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { Shop } from '../models/shop';

@Component({
  selector: 'app-liked-shops',
  templateUrl: './liked-shops.component.html',
  styleUrls: ['./liked-shops.component.css']
})
export class LikedShopsComponent implements OnInit {
  LikedShopPages: any;
  motCle:string = "";

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.onSearch();
  }

  /*search for a shop by keyword */
  onSearch(){
    /*search in database */
    this.shopService.getLikedShops(this.motCle)
    .subscribe(res=>{
      this.LikedShopPages = res;
      this.LikedShopPages = this.LikedShopPages.content;
      /*order shops*/
      this.shopService.sortShops(this.LikedShopPages);
    }, err =>{
      console.log(err);
    });
  }

  /*remove a disliked or unliked shop from liked list*/
  onDislike(shop:Shop){
    let confirm = window.confirm("Do you want to remove this shop from your liked list?");
      if(confirm==true)
      this.shopService.deleteShop(shop)
      .subscribe(data=> {
        alert("Shop deleted");
        this.LikedShopPages.splice(
        this.LikedShopPages.indexOf(shop),
        1)
      }, err=> console.log(err))
  }

  /*same thing for unlike */
  onUnlike(shop:Shop){
    this.onDislike(shop);
  }

}
