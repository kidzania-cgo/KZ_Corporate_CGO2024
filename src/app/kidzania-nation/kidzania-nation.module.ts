import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { KidzaniaNationComponent } from './kidzania-nation.component';
import { ZtoryComponent } from './ztory.component';
import { OurCultureComponent } from './our-culture.component';
import { RightzComponent } from './rightz-keepers.component';
import { CompanyInfoComponent } from './company-info.component';
import { TheCompanyComponent } from './the-company.component';
import { FranchisesComponent } from './franchises.component';
import { PartnersComponent } from './partners.component';
import { CsrComponent } from './csr.component';
import { AwardsComponent } from './awards.component';
import { PressComponent } from './press.component';
import { ThankYouComponent } from './thank-you.component';
import { PrivacyComponent } from './privacy.component';
import { NotFoundComponent } from './not-found.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    KidzaniaNationComponent,
    ZtoryComponent,
    OurCultureComponent,
    RightzComponent,
    CompanyInfoComponent,
    TheCompanyComponent,
    FranchisesComponent,
    PartnersComponent,
    CsrComponent,
    AwardsComponent,
    PressComponent,
    ThankYouComponent,
    PrivacyComponent,
    NotFoundComponent
  ],
  providers: [
  ]
})
export class KidzaniaNationModule { }
