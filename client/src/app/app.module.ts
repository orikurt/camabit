import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { CoinService } from './coin.service';
import { SearchService } from './search.service';
import { CoinsComponent } from './coins/coins.component';
import { MetaComponent } from './meta/meta.component';
import { HotCoinComponent } from './hot-coin/hot-coin.component';
import { HomeComponent } from './home/home.component';
import { AllCoinsComponent } from './all-coins/all-coins.component';
import { LargeNumberPipe } from './large-number.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavComponent } from './nav/nav.component';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoinPageComponent } from './coin-page/coin-page.component';

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
    SpinnerComponent,
    NavComponent,
    InfiniteScrollerDirective,
    FooterComponent,
    PageNotFoundComponent,
    CoinPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CoinService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
