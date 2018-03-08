import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'top-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinsComponent implements OnInit, OnDestroy{

  coins: Coin[];
  currentPage;
  disposable;
  pagesSubscription;

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { 
    this.coins = [];
    this.currentPage = 1;
  }
    
  ngOnInit() {
    this.cdr.detach();
    this.disposable = this.coinService.coins.subscribe(coins => {
      this.pagesSubscription ? this.pagesSubscription.unsubscribe() : null;
      this.pagesSubscription = this.coinService.pages.subscribe(this.handlePage);
      this.page(this.currentPage);

      if(this.disposable && this.coins.length){
        this.disposable.unsubscribe();
      }
    });
  }

  ngOnDestroy(){
    this.pagesSubscription.unsubscribe();
  }

  private handlePage = (coins) => {
    this.coins = coins;
    this.cdr.detectChanges();
  }

  page(num){
    this.coinService.page(num);
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
}
