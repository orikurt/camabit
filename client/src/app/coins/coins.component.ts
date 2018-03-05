import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'top-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinsComponent implements OnInit {

  coins: Coin[];
  currentPage;
  disposable;

  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { 
    this.coins = [];
    this.currentPage = 1;
  }
    
  ngOnInit() {
    this.cdr.detach();
    this.disposable = this.coinService.coins.subscribe(coins => {
      
      this.page(1);

      if(this.disposable && this.coins.length){
        this.disposable.unsubscribe();
      }
    });
  }

  page(num){
    this.coins = this.coinService.page(num);
    this.cdr.detectChanges();
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
