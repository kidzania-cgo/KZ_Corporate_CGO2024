import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    HomepageComponent
  ],
  providers: [
  ]
})
export class HomepageModule { }
