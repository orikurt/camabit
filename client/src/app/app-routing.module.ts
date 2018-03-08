import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoinsComponent } from './all-coins/all-coins.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "all", component: AllCoinsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})

export class AppRoutingModule { 

}
