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

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { 
    this.coins = [];
    this.currentPage = 1;
  }
    
  ngOnInit() {
    this.cdr.detach();
    this.disposable = this.coinService.getCoins(this.currentPage).subscribe(this.handlePage);
  }

  ngOnDestroy(){
    this.disposable.unsubscribe();
  }

  private handlePage = (coins) => {
    this.coins = coins;
    this.cdr.detectChanges();
  }

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
}
