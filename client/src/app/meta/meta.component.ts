import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '../coin.service'

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaComponent implements OnInit {
  meta: any = {};
  disposable;

  constructor(private coinService:CoinService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdr.detach();
    // this.disposable = this.coinService.meta.subscribe(meta => {
    //   this.meta = meta;
    //   this.cdr.detectChanges();
    //   if(this.disposable && Object.keys(this.meta).length){
    //     this.disposable.unsubscribe();
    //   }
    // });
    this.coinService.getMeta().subscribe(meta=> {
      this.meta = meta;
      this.cdr.detectChanges();
    });
  }

}
