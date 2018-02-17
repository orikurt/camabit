import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { CoinService } from './coin.service';
import { CoinsComponent } from './coins/coins.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    CoinsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CoinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
