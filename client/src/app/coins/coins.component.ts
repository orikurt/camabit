import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  coins: Coin[] = [];

  constructor(private coinService: CoinService) { }

  ngOnInit() {
    this.getCoins();
  }

  getCoins(): void{
    this.coinService.getCoins().subscribe(res => this.coins = res);
  }
}
