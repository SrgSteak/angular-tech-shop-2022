import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  protected results = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  updateResults(searchstring: string) {
    this.results = this.searchService.findResults(searchstring);
  }

}
