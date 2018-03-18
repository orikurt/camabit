import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

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
        height: '320px',
      })),
      transition('in <=> out', animate('500ms ease-in-out'))
    ])
  ]    
})
export class NavComponent implements OnInit {
  nav_bar;
  @Input('menuState') menuState:string;
  constructor(private router:Router) {
    router.events.subscribe((val) => this.menuState = 'down'); 
  }

  ngOnInit() {
    this.nav_bar = [
      {name: "עמוד הבית", path: "/"}, 
      {name: "התיק שלי", path: "/coins"}, 
      {name: "מאמרים", path: "/coins"}, 
      {name: "תיקים של אחרים", path: "/coins"}, 
      {name: "קנה ביט", path: "/coins"}, 
      {name: "קנה אלטים", path: "/coins"}, 
      {name: "מה זה ביטקוין?", path: "/coins"}, 
      {name: "מי אנחנו", path: "/coins"}
    ];    
  }
  
  toggle(){
    this.menuState = this.menuState == "in" ? "out" : "in";
  }
}
