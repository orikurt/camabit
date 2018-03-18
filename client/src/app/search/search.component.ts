import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { Event } from '@angular/router/src/events';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  queryTerm:string;
  searchResults;
  selected:number;

  constructor(private searchService: SearchService, private router: Router){
    this.searchResults = [];
    this.selected = 0;
  }

  doSearch(){
      this.searchResults = this.searchService.search(this.queryTerm).slice(0, 7);
  }

  clear(){
    setTimeout(()=>{
      this.searchResults = [];
    }, 200)
  }

  incrementSelected(){
   this.selected = (this.selected + 1) % this.searchResults.length;
  }

  decrementSelected(){
    this.selected = this.selected > 0 ? this.selected -= 1 : this.selected = this.searchResults.length -1;
  }

  navigate(){
    this.clear();
    this.router.navigate(['/coins', this.searchResults[this.selected].id]);
  }
}

