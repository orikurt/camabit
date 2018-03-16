import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  searchResults;
  term;
  
  constructor(private searchService: SearchService){
    this.term ='';
    this.searchResults = [];
  }

  doSearch(){
    this.searchResults = this.searchService.search(this.term).slice(0, 7);
  }

  clear(){
    this.searchResults = [];
  }
}

