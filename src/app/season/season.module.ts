import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SeasonComponent } from './season.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    SeasonComponent
  ],
  providers: [
  ]
})
export class SeasonModule {}
