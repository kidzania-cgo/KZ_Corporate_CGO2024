import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { WhatIsKidzanianModule } from './what-is-kidzanian/what-is-kidzanian.module';
import { BKidzanianModule } from './b-kidzanian/b-kidzanian.module';
import { KidzaniaNationModule } from './kidzania-nation/kidzania-nation.module';
import { AppRoutingModule } from './app-routing.module';
import { HomepageModule } from './homepage/homepage.module';
import { HomepageComponent } from './homepage/homepage.component';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CareersModule } from './careers/careers.module';
import { SeasonModule } from './season/season.module';
import { MetaLoader, MetaModule, MetaStaticLoader } from '@ngx-meta/core';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    SharedModule,
    HomepageModule,
    BKidzanianModule,
    WhatIsKidzanianModule,
    CareersModule,
    SeasonModule,
    KidzaniaNationModule,
    MetaModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
