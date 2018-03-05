import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '../coin.service'
import { Coin } from '../coin';

@Component({
  selector: 'all-coins',
  templateUrl: './all-coins.component.html',
  styleUrls: ['./all-coins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCoinsComponent implements OnInit {

  allCoins: Coin[];
  currentPage: number = 0;
  scrollCallback;
  disposable;

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { 
    this.allCoins = [];
    this.currentPage = 0;
    this.scrollCallback = this.moreCoins.bind(this);  
  }

  ngOnInit() {
    this.cdr.detach();
    this.disposable = this.coinService.coins.subscribe(coins => {
      this.allCoins = this.allCoins.concat(coins);
      this.cdr.detectChanges();
      if (this.disposable && this.allCoins.length){
        this.disposable.unsubscribe();
      }
    });
  }

  moreCoins() {
    console.log("morecoins", this.currentPage, this.allCoins.length);
    return this.coinService.pageSubscription(++this.currentPage).do(this.handlePage);
  }

  private handlePage = (coins) => {
    console.log("handle page", coins);
    this.allCoins = this.allCoins.concat(coins);
    this.cdr.detectChanges();
  }

  trackFunc(index, item){
    return item.id;
  }

}
