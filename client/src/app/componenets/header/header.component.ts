import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  nav_bar = [{name: "עמוד הבית"}, {name: "התיק שלי"}, {name: "תיקים של אחרים"}, {name: "קנה ביט"}, {name: "קנה אלטים"}, {name: "מה זה ביטקוין?"}, {name: "מי אנחנו"}];
}
