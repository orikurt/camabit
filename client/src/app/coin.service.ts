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

  private _coins = new BehaviorSubject<Coin[]>([]);
  public coins = this._coins.asObservable();

  private _meta = new BehaviorSubject({});
  public meta = this._meta.asObservable();  
  
  constructor( private http: HttpClient ) {
    this.getCoins();
    this.getMeta();
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
    ).subscribe(coins => this._coins.next(coins.slice(0,100)));
  }

  getMeta(): void{
    this.http.get<any>(this.metaUrl).pipe(
      map(res => {
        return JSON.parse(res.meta);
      })
    ).subscribe(meta => this._meta.next(meta));
  }
}
