import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CoinService } from '../coin.service';
import { Coin } from '../coin';

@Injectable()
export class CoinsResolve implements Resolve<any> {

  constructor(private coinService: CoinService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.coinService.allCoins();
  }
}