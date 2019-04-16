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
  pages:Array<any>;
  //Pagination
  page : number = 0;
  motCle:string = "";
  size:number = 1;
  currentPage: number = 0;

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.doSearch();
  }

  doSearch(){
    this.shopService.getShops(this.motCle, this.currentPage, this.size)
    .subscribe(res=>{
      this.LikedShopPages = res;
      this.pages = new Array(this.LikedShopPages.totalPages);
      this.LikedShopPages = this.LikedShopPages.content;
      this.shopService.sortShops(this.LikedShopPages);
    }, err =>{
      console.log(err);
    });
  }

  gotoPage(i:number){
    this.currentPage=i;
    this.doSearch();
  }
  getLikedShops(){//UNUSED
    this.LikedShopPages=this.shopService.getShops(this.motCle, this.size, this.page);
  }
  onUnlike(shop:Shop){
    this.onDislike(shop);
  }
  onDislike(shop:Shop){
    let confirm = window.confirm("etes vous sûr de vouloir unliker ce shop?");
      if(confirm==true)
      this.shopService.deleteShop(shop.id)
      .subscribe(data=> {
        alert("Shop supprimé");
        this.LikedShopPages.splice(
          this.LikedShopPages.indexOf(shop),1
        )
      }, err=> console.log(err))
  }

}
