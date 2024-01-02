import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CareersComponent } from './careers.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CareersComponent
  ],
  providers: [
  ]
})
export class CareersModule {}
