import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BKidzanianComponent } from './b-kidzanian.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    BKidzanianComponent
  ],
  providers: [
  ]
})
export class BKidzanianModule { }
