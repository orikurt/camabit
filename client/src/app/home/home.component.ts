import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  coins: Coin[];

  constructor(private coinService: CoinService) {
    this.coins = [];
  }

  ngOnInit() {
    this.coinService.coins.subscribe(coins => {
      this.coins = this.coinService.page(1);
    });
  }

}
