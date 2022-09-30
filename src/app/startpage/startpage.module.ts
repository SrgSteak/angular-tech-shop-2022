import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageComponent } from './startpage.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [StartpageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StartpageComponent
      }
    ])
  ]
})
export class StartpageModule { }
