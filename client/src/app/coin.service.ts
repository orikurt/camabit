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
  // coins: Coin[] = [];
  constructor( private http: HttpClient ) { }

  getCoins(): Observable<Coin[]> {
    return this.http.get(this.coinsUrl).pipe(
      map(res => res.coins)
    );
  }
}
