import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleMenu', [
      state('down', style({
        height: '42px',
      })),
      state('up', style({
        height: '150px',
      })),
      transition('down <=> up', animate('500ms ease-in-out'))
    ])
  ]      
})
export class HomeComponent implements OnInit {
  coins: Coin[];
  disposable;
  metaState;

  constructor(private coinService: CoinService) {
    this.coins = [];
    this.metaState = "down";
  }

  ngOnInit() {
    this.disposable = this.coinService.coins.subscribe(coins => {
      this.coins = coins;
      if(this.disposable && this.coins.length){
        this.disposable.unsubscribe();
      }
    });
  }

  toggleMeta(){
    this.metaState = this.metaState == "down" ? "up" : "down";
  }
}
