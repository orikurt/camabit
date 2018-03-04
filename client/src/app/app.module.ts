import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { CoinService } from './coin.service';
import { CoinsComponent } from './coins/coins.component';
import { MetaComponent } from './meta/meta.component';
import { HotCoinComponent } from './hot-coin/hot-coin.component';
import { HomeComponent } from './home/home.component';
import { AllCoinsComponent } from './all-coins/all-coins.component';
import { LargeNumberPipe } from './large-number.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    CoinsComponent,
    MetaComponent,
    HotCoinComponent,
    HomeComponent,
    AllCoinsComponent,
    LargeNumberPipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CoinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
