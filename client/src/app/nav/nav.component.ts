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
    this.nav_bar = [{name: "עמוד הבית"}, {name: "התיק שלי"}, {name: "מאמרים"}, {name: "תיקים של אחרים"}, {name: "קנה ביט"}, {name: "קנה אלטים"}, {name: "מה זה ביטקוין?"}, {name: "מי אנחנו"}];
  }

  ngOnInit() {
  }
  
  toggle(){
    this.menuState = this.menuState == "in" ? "out" : "in";
  }
}
