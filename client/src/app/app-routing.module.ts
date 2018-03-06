import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoinsComponent } from './all-coins/all-coins.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "all", component: AllCoinsComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})

export class AppRoutingModule { 

}
