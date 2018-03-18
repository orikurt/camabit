import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class Coin {
  constructor(public name: string, public symbol: string, public id: string) { }
}

@Injectable()
export class SearchService {
  COINS_URL = '/api/coins/index';
  coins: Coin[];

  constructor(private http: HttpClient) {
    this.coins = [];
    setTimeout(()=>{
      http.get<any>(this.COINS_URL).pipe(
        map(response => {
          this.coins = response.coins;
        })
      ).subscribe();
    }, 42);
  }

  search(term){
    return this.coins.filter(coin=> (coin.name + coin.symbol).toLowerCase().indexOf(term) >= 0);
  }
}
