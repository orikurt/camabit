import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'hot-coin',
  templateUrl: './hot-coin.component.html',
  styleUrls: ['./hot-coin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotCoinComponent implements OnInit {
  hotCoin: Coin;
  disposable;
  constructor(private coinService: CoinService, private cdr: ChangeDetectorRef) { 
    this.hotCoin = {} as Coin;
  }
  ngOnInit() {
    this.cdr.detach();
    this.disposable = this.coinService.coins.subscribe(coins => {
      this.hotCoin = this.coinService.hot();
      this.cdr.detectChanges();
      if(this.disposable && this.hotCoin){
        this.disposable.unsubscribe();
      }
    });
  }

}
