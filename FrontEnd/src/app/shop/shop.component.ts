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
  deslikedShops = [];//array containing ids of desliked shops
  constructor(private shopService: ShopService) { }

  ngOnInit() {
    //get desliked shops
    this.deslikedShops = JSON.parse(localStorage.getItem("deslikedShops"));
    this.doSearch();
  }

  //get 3 shops by page
  doSearch(): void{
    this.shopService.getShops(this.currentPage)
    .subscribe(res=>{
      this.shops = res;
      this.totalPages = new Array(this.shops.totalPages);
      this.shops = this.shops.content;
      this.filtreShops();//remove desliked shops
    }, err =>{
      console.log(err);
    });
  }

  onLike(shop:Shop){
    //add shop to user's liked shops
    this.shopService.likeShop(shop)
   .subscribe(data =>{
     //remove liked shop from home page
     this.spliceShop(shop);
  }, err=>{
    console.log(err);
  })
  }

  onDislike(shop:Shop){
    //get desliked shops
    this.deslikedShops = JSON.parse(localStorage.getItem("deslikedShops"));
    if(this.deslikedShops.indexOf(shop.id+"") == -1){
    //add shop to deslikedshops in local storage
    this.deslikedShops.push(shop.id+"");
    //update local storage
    localStorage.setItem("deslikedShops", JSON.stringify(this.deslikedShops));
    //remove liked shop from home page
    this.spliceShop(shop);
  }
  }

  gotoPage(i:number){
    this.currentPage=i;
    this.doSearch();
  }

  //delete disliked or liked shop from home page
  spliceShop(shop: Shop){
    let index = this.shops.indexOf(shop);
    this.shops.splice(index,1);
  }

  //delete desliked shops from shop list
  filtreShops(){
    this.shops.forEach(e => {
      if( this.deslikedShops.indexOf(e.id+"")!=(-1)) {
        this.spliceShop(e);
      }
    });
  }
}
