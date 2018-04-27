import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'hot-coin',
  templateUrl: './hot-coin.component.html',
  styleUrls: ['./hot-coin.component.scss']
})
export class HotCoinComponent implements OnInit {
  hotCoins: Coin[];

  constructor(private coinService: CoinService) { 
    this.hotCoins = [] as Coin[];
  }
  ngOnInit() {
    this.coinService.getHotCoin().subscribe(coins => this.hotCoins = coins);
  }
}
