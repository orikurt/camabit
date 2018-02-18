import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators'
import { Coin } from './coin';
import { COINS } from './mock.coins';

@Injectable()
export class CoinService {

  private coinsUrl = '/coins';
  private metaUrl = '/meta';
  // coins: Coin[] = [];
  constructor( private http: HttpClient ) { }

  getCoins(): Observable<Coin[]> {
    return this.http.get(this.coinsUrl).pipe(
      map(res => {
        return res.coins.map(coin => {
          coin._24h_volume_usd = coin['24h_volume_usd'];
          coin._24h_volume_ils = coin['24h_volume_ils'];
          return coin;
        });
      })
    );
  }

  getMeta(): Observable<any>{
    return this.http.get(this.metaUrl).pipe(
      map(res => {
        return JSON.parse(res.meta);
      })
    )
  }
}
