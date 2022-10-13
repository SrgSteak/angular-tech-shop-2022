import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';

import { SearchformComponent } from './searchform.component';

describe('SearchformComponent', () => {
  let component: SearchformComponent;
  let fixture: ComponentFixture<SearchformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchformComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search query when it was changed', () => {
    const searchService = TestBed.inject(SearchService);
    spyOn(component.searchOutput, 'emit');

    searchService.searchForm.patchValue({ textsearch: 'teststring'});
    expect(component.searchOutput.emit).toHaveBeenCalledOnceWith('teststring');
  })
});
