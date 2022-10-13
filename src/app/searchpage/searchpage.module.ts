import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchpageComponent } from './searchpage.component';
import { ResultlistComponent } from './resultlist/resultlist.component';
import { ResultitemComponent } from './resultitem/resultitem.component';
import { SearchformComponent } from './searchform/searchform.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    SearchpageComponent,
    SearchformComponent,
    ResultlistComponent,
    ResultitemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchpageComponent
      }
    ])
  ]
})
export class SearchpageModule { }
