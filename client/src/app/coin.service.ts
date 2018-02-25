import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { map } from 'rxjs/operators';
import { Coin } from './coin';

@Injectable()
export class CoinService {

  private coinsUrl = '/coins';
  private metaUrl = '/meta';

  private _coins: BehaviorSubject<Coin[]>;
  private _meta: BehaviorSubject<{}>;
  private dataStore: {
    coins: Coin[],
    meta: {}
  };
  
  constructor( private http: HttpClient ) {
    this.dataStore = { 
      coins: [],
      meta: {}
    };
    this._coins = <BehaviorSubject<Coin[]>>new BehaviorSubject([]);
    this._meta = <BehaviorSubject<{}>>new BehaviorSubject([]);
    this.getCoins();
    this.getMeta();
  }

  get coins(){
    return this._coins.asObservable();
  }

  get meta(){
    return this._meta.asObservable();
  }
  
  getCoins(): void{
    this.http.get<any>(this.coinsUrl).pipe(
      map(res => {
        res.coins.map(coin => {
          coin._24h_volume_usd = coin['24h_volume_usd'];
          coin._24h_volume_ils = coin['24h_volume_ils'];
          return coin;
        });
        return res.coins;
      })
    ).subscribe(coins => {
      this.dataStore.coins = coins;
      this._coins.next(Object.assign({}, this.dataStore).coins);
    });
  }

  getMeta(): void{
    this.http.get<any>(this.metaUrl).pipe(
      map(res => {
        return JSON.parse(res.meta);
      })
    ).subscribe(meta => {
      this.dataStore.meta = meta;
      this._meta.next(meta);
    });
  }
}
