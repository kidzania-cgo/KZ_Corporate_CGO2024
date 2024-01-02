import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { WhatIsKidzanianComponent } from './what-is-kidzanian.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    WhatIsKidzanianComponent
  ],
  providers: [
  ]
})
export class WhatIsKidzanianModule {}
