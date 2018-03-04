import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuState:string;
  constructor(){
    this.menuState = "in";
  }
  toggleMenu(){
    this.menuState = this.menuState == "in" ? "out" : "in";
  }
}
