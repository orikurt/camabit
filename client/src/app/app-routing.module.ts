import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinService } from './coin.service';
import { CoinsResolve } from './resolvers/coins.resolver';
import { AllCoinsComponent } from './all-coins/all-coins.component';
import { CoinPageComponent } from './coin-page/coin-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "coins", component: AllCoinsComponent, resolve: {coins: CoinsResolve} },
  { path: "coins/:id", component: CoinPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)],
  providers: [
    CoinService,
    CoinsResolve
  ]
})

export class AppRoutingModule { 

}
