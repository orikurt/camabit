import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinService } from '../coin.service'
import { Coin } from '../coin';

@Component({
  selector: 'all-coins',
  templateUrl: './all-coins.component.html',
  styleUrls: ['./all-coins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCoinsComponent implements OnInit, OnDestroy {

  allCoins: Coin[];
  currentPage: number = 0;
  scrollCallback;
  disposable;

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef, private route:ActivatedRoute) { 
    this.allCoins = [];
    this.currentPage = 1;
    this.scrollCallback = this.moreCoins.bind(this);  
  }

  ngOnInit() {
    this.cdr.detach();
    this.allCoins = this.route.snapshot.data['coins'];
    this.cdr.detectChanges();
  }

  ngOnDestroy(){

  }

  moreCoins() {
    return this.coinService.getCoins(++this.currentPage).do(this.handlePage);
  }

  private handlePage = (coins) => {
    this.allCoins = this.allCoins.concat(coins);
    this.cdr.detectChanges();
  }

  trackFunc(index, item){
    return item.id;
  }

}
