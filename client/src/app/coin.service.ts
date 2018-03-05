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
  private PAGE_SIZE = 100;

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
  
  page(num){
    let start = this.PAGE_SIZE*(num-1);
    return this.dataStore.coins.slice(start, start+this.PAGE_SIZE);
  }

  hot(){
    return this.dataStore.coins.concat().sort((coina, coinb) => { return coina.percent_change_24h - coinb.percent_change_24h; }).reverse()[0];
  }

  all(){
    return this.dataStore.coins;    
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
      , map(coins => coins.sort((coina, coinb) => { return parseInt(coina.rank) - parseInt(coinb.rank); }))
    ).subscribe(coins => {
      this.dataStore.coins = coins;
      for (let i=0; i<this.dataStore.coins.length; i+=10){
        ((i)=>{
          setTimeout(()=>{
            this._coins.next(this.dataStore.coins.slice(i, i+10));
          }, i);
        })(i);
      }
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
