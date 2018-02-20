import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service'
import { Coin } from '../coin';

@Component({
  selector: 'all-coins',
  templateUrl: './all-coins.component.html',
  styleUrls: ['./all-coins.component.scss']
})
export class AllCoinsComponent implements OnInit {

  allCoins: Coin[] = [];
  constructor(private coinService: CoinService) { }

  ngOnInit() {
    this.coinService.coins.subscribe(coins => this.allCoins = coins);
  }

}
