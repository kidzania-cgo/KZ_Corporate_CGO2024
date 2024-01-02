import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { BKidzanianComponent } from './b-kidzanian/b-kidzanian.component';
import { WhatIsKidzanianComponent } from './what-is-kidzanian/what-is-kidzanian.component';
import { KidzaniaNationComponent } from './kidzania-nation/kidzania-nation.component';
import { ZtoryComponent } from './kidzania-nation/ztory.component';
import { OurCultureComponent } from './kidzania-nation/our-culture.component';
import { RightzComponent } from './kidzania-nation/rightz-keepers.component';
import { CompanyInfoComponent } from './kidzania-nation/company-info.component';
import { TheCompanyComponent } from './kidzania-nation/the-company.component';
import { FranchisesComponent } from './kidzania-nation/franchises.component';
import { PartnersComponent } from './kidzania-nation/partners.component';
import { CsrComponent } from './kidzania-nation/csr.component';
import { PressComponent } from './kidzania-nation/press.component';
import { AwardsComponent } from './kidzania-nation/awards.component';
import { ThankYouComponent } from './kidzania-nation/thank-you.component';
import { PrivacyComponent } from './kidzania-nation/privacy.component';
import { NotFoundComponent } from './kidzania-nation/not-found.component';
import { MetaGuard } from '@ngx-meta/core';
import { CareersComponent } from './careers/careers.component';
import { SeasonComponent } from './season/season.component';

const appRoutes: Routes = [
  { path: ':lang', component: HomepageComponent },
  { path: ':lang/index', component: HomepageComponent },
  { path: ':lang/b-kidzanian', component: BKidzanianComponent },
  { path: ':lang/what-is-kidzania', component: WhatIsKidzanianComponent },
  { path: ':lang/kidzania-nation', component: KidzaniaNationComponent },
  { path: ':lang/ztory', component: ZtoryComponent },
  { path: ':lang/culture', component: OurCultureComponent },
  { path: ':lang/rightzkeepers', component: RightzComponent },
  { path: ':lang/company-info', component: CompanyInfoComponent },
  { path: ':lang/the-company', component: TheCompanyComponent },
  { path: ':lang/franchises', component: FranchisesComponent },
  { path: ':lang/industry-partners', component: PartnersComponent },
  { path: ':lang/csr', component: CsrComponent },
  { path: ':lang/awards', component: AwardsComponent },
  { path: ':lang/press', component: PressComponent },
  { path: ':lang/thank-you', component: ThankYouComponent },
  { path: ':lang/privacy', component: PrivacyComponent },
  { path: ':lang/careers', component: CareersComponent },
  { path: ':lang/concurso-de-fotografia', component: SeasonComponent },
  { path: '', redirectTo: '/en', pathMatch: 'full' },
  { path: ':lang/404', component: NotFoundComponent},
  { path: '**', redirectTo: '/en/404'},
  { path: ':lang', children: [
    { path: '404', component: NotFoundComponent},
    { path: '**', redirectTo: '404'}
  ]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
