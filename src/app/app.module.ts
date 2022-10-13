import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
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
      loadComponent: () => import('./aboutpage/aboutpage.component').then(c => c.AboutpageComponent)
    },
    {
      path: 'search',
      loadChildren: () => import('./searchpage/searchpage.module').then(m => m.SearchpageModule)
    },
    {
      path: 'convoluted-neural-network',
      loadComponent: () => import('./mnist-number-magic/mnist-number-magic.component').then(c => c.MnistNumberMagicComponent)
    },
    {
      path: '*',
      redirectTo: ''
    }
  ]) ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
