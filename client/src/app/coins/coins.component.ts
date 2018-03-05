import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
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

  constructor(private coinService: CoinService, private zone: NgZone) { 
    this.coins = [];
    this.currentPage = 1;
  }
    
  ngOnInit() {
    this.disposable = this.coinService.coins.subscribe(coins => {
      
      this.page(1);

      if(this.disposable && this.coins.length){
        this.disposable.unsubscribe();
      }
    });
  }

  page(num){
    this.zone.run(()=>this.coins = this.coinService.page(num));    
  }

  nextPage(){
    this.zone.run(()=>this.coins = this.coinService.page(++this.currentPage));
  }
  previousPage(){
    this.zone.run(()=>this.coins = this.coinService.page(--this.currentPage));
  }  

  trackFunc(index, item){
    return item.id;
  }  
}
