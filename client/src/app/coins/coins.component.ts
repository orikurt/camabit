import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '../coin.service';
import { Observable } from 'rxjs/Observable';
import { Coin } from '../coin';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'top-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinsComponent implements OnInit, OnDestroy{

  coinPage: Coin[];
  coins: Coin[];
  currency: string;
  currentPage;
  disposable;
  scrollCallback;

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { 
    this.coins = [];
    this.coinPage = [];
    this.currentPage = 1;
    this.currency = "usd";
    this.scrollCallback = this.handleScroll.bind(this);  
  }
    
  ngOnInit() {
    this.cdr.detach();
    this.disposable = this.coinService.getCoins(this.currentPage).subscribe(this.handlePage);
  }

  ngOnDestroy(){
    this.disposable.unsubscribe();
  }

  private handlePage = (coins) => {
    this.coinPage = coins;
    this.coins = [];
    this.addChunk();
  }

  private addChunk = ()=>{
    let chunk = this.coinPage.slice(0, 10);
    this.coinPage = this.coinPage.slice(11);
    this.coins = this.coins.concat(chunk);
    this.cdr.detectChanges();
    return chunk;
  }

  private handleScroll = ()=>{
    return Observable.of(this.addChunk());
  };

  page(num){
    this.coinService.getCoins(num).subscribe(this.handlePage);
  }

  nextPage(){
    this.page(++this.currentPage);
  }
  previousPage(){
    this.page(--this.currentPage);
  }  

  trackFunc(index, item){
    return item.id;
  }  

  setCurrency(currency){
    this.currency = currency;
    this.cdr.detectChanges();
  }
}
