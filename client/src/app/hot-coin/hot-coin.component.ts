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

  constructor(private coinService: CoinService) { 
    this.hotCoin = {} as Coin;
  }
  ngOnInit() {
    this.coinService.getHotCoin().subscribe(coin => this.hotCoin = coin);
  }
}
