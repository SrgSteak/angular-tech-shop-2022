import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StartpageComponent } from './startpage/startpage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { SearchformComponent } from './searchpage/searchform/searchform.component';
import { ResultlistComponent } from './searchpage/resultlist/resultlist.component';
import { ResultitemComponent } from './searchpage/resultitem/resultitem.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, RouterModule.forRoot([
    {
      path: '',
      pathMatch: 'full',
      component: StartpageComponent
    },
    {
      path: 'about',
      component: AboutpageComponent
    },
    {
      path: 'search',
      component: SearchpageComponent
    },
    {
      path: '*',
      redirectTo: ''
    }
  ]) ],
  declarations: [ AppComponent, HelloComponent, StartpageComponent, AboutpageComponent, SearchpageComponent, SearchformComponent, ResultlistComponent, ResultitemComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
