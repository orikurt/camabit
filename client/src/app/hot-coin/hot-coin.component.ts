import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'hot-coin',
  templateUrl: './hot-coin.component.html',
  styleUrls: ['./hot-coin.component.scss']
})
export class HotCoinComponent implements OnInit {
  hotCoin: Coin;
  disposable;
  constructor(private coinService: CoinService) { 
    this.hotCoin = {} as Coin;
  }
  ngOnInit() {
    this.disposable = this.coinService.coins.subscribe(coins => {
      let coinsCopy = this.coinService.all().concat();
      this.hotCoin = coinsCopy.sort((coina, coinb) => { return coina.percent_change_24h - coinb.percent_change_24h; }).reverse()[0];
      if(this.disposable && this.hotCoin){
        this.disposable.unsubscribe();
      }
    });
  }

}
