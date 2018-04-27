import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CoinService {

  private coinsUrl = (page) => `/api/coins?page=${page}`;
  private coinUrl = (id) => `/api/coins?coin_id=${id}`;
  private searchUrl = (phrase) => `/api/coins/search?phrase=${phrase}`;
  private hotCoinUrl = '/api/coins/hot';
  private metaUrl = '/api/meta';
  
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
    .refCount();
  }

  coin(id:string){
    return this.http.get<any>(this.coinUrl(id)).pipe(
      map(res => {
        return res.coin;
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
    .refCount();
  }

  getHotCoin(){
    return this.http.get<any>(this.hotCoinUrl).pipe(
      map(res => {
        return res.hotCoins;
      })
    ).publishReplay(3)
    .refCount();
  }
  
}
