import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '1px',
      })),
      state('out', style({
        height: '273px',
      })),
      transition('in <=> out', animate('500ms ease-in-out'))
    ])
  ]    
})
export class NavComponent implements OnInit {
  nav_bar;
  @Input('menuState') menuState:string;
  constructor() { 
    this.nav_bar = [
      {name: "עמוד הבית", path: "/"}, 
      {name: "התיק שלי", path: "/all"}, 
      {name: "מאמרים", path: "/all"}, 
      {name: "תיקים של אחרים", path: "/all"}, 
      {name: "קנה ביט", path: "/all"}, 
      {name: "קנה אלטים", path: "/all"}, 
      {name: "מה זה ביטקוין?", path: "/all"}, 
      {name: "מי אנחנו", path: "/all"}
    ];
  }

  ngOnInit() {
  }
  
  toggle(){
    this.menuState = this.menuState == "in" ? "out" : "in";
  }
}
