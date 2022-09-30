import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  @Output('search') searchOutput = new EventEmitter<string>();

  private formupdates: Subscription;

  constructor(protected searchService: SearchService) { }

  ngOnInit(): void {
    this.formupdates = this.searchService.searchForm.valueChanges.subscribe(form => {
      this.searchOutput.emit(form.textsearch);
    });
  }

  ngOnDestroy(): void {
    this.formupdates?.unsubscribe();
  }

}
