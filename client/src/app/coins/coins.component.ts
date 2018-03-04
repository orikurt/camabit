import { Component, OnInit, ApplicationRef, NgZone } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'top-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  coins: Coin[];

  constructor(private coinService: CoinService, private zone: NgZone) { 
    this.coins = [];
  }
    
  ngOnInit() {
    this.coinService.coins.subscribe(coins => {
      this.zone.run(()=>this.coins = this.coinService.page(1));
    });
  }
}
