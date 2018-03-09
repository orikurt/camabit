import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { map } from 'rxjs/operators';
import { Coin } from './coin';

@Injectable()
export class CoinService {

  private coinsUrl = (page) => `/coins?page=${page}`;
  private searchUrl = (phrase) => `/coins/search?phrase=${phrase}`;
  private hotCoinUrl = '/coins/hot';
  private metaUrl = '/meta';
  
  constructor( private http: HttpClient ) {}

  getCoins(page: number = 1): any{
    return this.http.get<any>(this.coinsUrl(page)).pipe(
      map(res => {
        res.coins.map(coin => {
          coin._24h_volume_usd = coin['24h_volume_usd'];
          coin._24h_volume_ils = coin['24h_volume_ils'];
          return coin;
        });
        return res.coins;
      })
    ).publishReplay(3)
    .refCount();;
  }

  search(phrase: string){
    return this.http.get<any>(this.searchUrl(phrase)).pipe(
      map(res => {
        return JSON.parse(res.results);
      })
    );    
  }

  getMeta(){
    return this.http.get<any>(this.metaUrl).pipe(
      map(res => {
        return JSON.parse(res.meta);
      })
    ).publishReplay(1)
    .refCount();;
  }

  getHotCoin(){
    return this.http.get<any>(this.hotCoinUrl).pipe(
      map(res => {
        return res.hotCoin;
      })
    ).publishReplay(3)
    .refCount();;    
  }
  
}
