import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchForm = this.fb.group({
    textsearch: this.fb.control('')
  });

  private data = ['Peter', 'Andreas', 'Valery', 'Alex', 'Danilo', 'Manuel', 'Robin', 'Marcel']

  constructor(private fb: FormBuilder) { }

  findResults(searchstring: string): Array<string> {
    return this.data.filter(pred => pred.toLocaleLowerCase().includes(searchstring.toLocaleLowerCase()));
  }
}
