import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { Shop } from '../models/shop';

@Component({
  selector: 'app-liked-shops',
  templateUrl: './liked-shops.component.html',
  styleUrls: ['./liked-shops.component.css']
})
export class LikedShopsComponent implements OnInit {
  LikedShops: any;
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
      this.LikedShops = res;
      this.LikedShops = this.LikedShops.content;
    }, err =>{
      console.log(err);
    });
  }

  /*remove a disliked shop from liked list and add it to ddesliked shops in local storage*/
  onDislike(shop:Shop){
    this.onUnlike(shop);
    //get desliked shops
    let deslikedShops = JSON.parse(localStorage.getItem("deslikedShops"));
    //add shop to deslikedshops in local storage
    deslikedShops.push(shop.id+"");
    //update local storage
    localStorage.setItem("deslikedShops", JSON.stringify(deslikedShops));
  }

  /*remove unliked shop from liked shops */
  onUnlike(shop:Shop){
    let confirm = window.confirm("Do you want to remove this shop from your liked list?");
      if(confirm==true)
      this.shopService.unlikeShop(shop)
      .subscribe(data=> {
        alert("Shop removed");
        this.spliceShop(shop);
      }, err=> console.log(err))
  }
   spliceShop(shop: Shop){
    let index = this.LikedShops.indexOf(shop);
    this.LikedShops.splice(index,1);
  }


}
