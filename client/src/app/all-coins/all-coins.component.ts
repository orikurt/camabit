import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '../coin.service'
import { Coin } from '../coin';

@Component({
  selector: 'all-coins',
  templateUrl: './all-coins.component.html',
  styleUrls: ['./all-coins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCoinsComponent implements OnInit {

  allCoins: Coin[];
  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { 
    this.allCoins = [];
  }

  ngOnInit() {
    this.cdr.detach();
    this.coinService.coins.subscribe(coins => {
      this.cdr.detectChanges();
      this.allCoins = this.allCoins.concat(coins);
    });
  }

  trackFunc(index, item){
    return item.id;
  }

}
