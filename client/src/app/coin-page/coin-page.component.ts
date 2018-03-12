import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Component({
  selector: 'app-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrls: ['./coin-page.component.scss']
})
export class CoinPageComponent implements OnInit {
  coin: Coin;
  coin_id: string;

  constructor(private coinService: CoinService, private route: ActivatedRoute) { 
    this.coin = {} as Coin;
  }

  ngOnInit() {
    this.coin_id = this.route.snapshot.params['id'];
    this.coinService.coin(this.coin_id).subscribe(coin => {
      this.coin = coin;
    });
  }

}
