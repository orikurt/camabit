import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { setTimeout } from 'timers';

@Injectable()
export class SearchService {
  COINS_URL = '/api/coins/index';
  coins;

  constructor(private http: HttpClient) {
    this.coins = [];
    setTimeout(()=>{
      http.get<any>(this.COINS_URL).pipe(
        map(response => {
          console.log(response);
          this.coins = response.coins;
        })
      ).subscribe();
    }, 42);
  }

  search(term){
    let results = [];
    this.coins.forEach(element => {
      if((element.symbol + element.name).toLowerCase().indexOf(term) != -1){
        results.push(element);
      }
    });
    return results;
  }
}
