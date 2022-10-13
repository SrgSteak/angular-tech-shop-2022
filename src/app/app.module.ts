import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot([
    {
      path: '',
      pathMatch: 'full',
      loadChildren: () => import('./startpage/startpage.module').then(m => m.StartpageModule)
    },
    {
      path: 'about',
      component: AboutpageComponent
    },
    {
      path: 'search',
      loadChildren: () => import('./searchpage/searchpage.module').then(m => m.SearchpageModule)
    },
    {
      path: '*',
      redirectTo: ''
    }
  ]) ],
  declarations: [ AppComponent, HelloComponent, AboutpageComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
