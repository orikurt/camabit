import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('toggleMenu', [
      state('down', style({
        height: '42px',
      })),
      state('up', style({
        height: '150px',
      })),
      transition('down <=> up', animate('500ms ease-in-out'))
    ])
  ]      
})
export class HomeComponent implements OnInit {
  metaState;

  constructor() {
    this.metaState = "down";
  }

  ngOnInit() {}

  toggleMeta(){
    this.metaState = this.metaState == "down" ? "up" : "down";
  }
}
