import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service'

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit {
  meta: any = {};

  constructor(private coinService:CoinService) { }

  ngOnInit() {
    this.coinService.meta.subscribe(meta => {
      this.meta = meta;
    });
  }

}
