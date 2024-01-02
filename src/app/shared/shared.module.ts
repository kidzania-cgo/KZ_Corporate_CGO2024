import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { SeasonElementComponent } from './components/season-element/season-element.component';
import { LeafComponent } from './components/season-element/leaf.component';
import { SpookyComponent } from './components/season-element/spooky.component';
import { SnowComponent } from './components/season-element/snow.component';
import { EnterpreneurComponent } from './components/season-element/enterpreneur.component';
import { PopUpModelComponent } from './components/pop-up-model/pop-up-model.component';
import { VideoComponent } from './components/video/video.component';
import { VideoPopupComponent } from './components/video-popup/video-popup.component';
import { MapComponent } from './components/map/map.component';
import { SeoComponent } from './components/seo/seo.component';

import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2MapModule} from 'ng2-map';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        // Modules
        CommonModule,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        Ng2MapModule.forRoot({
            apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB8ci7xdaVhv8kD-rn4c7YJ02qOdxnmwLU'
        })
    ],

    declarations: [
      ImageSliderComponent,
      SeasonElementComponent,
      LeafComponent,
      SpookyComponent,
      SnowComponent,
      EnterpreneurComponent,
      PopUpModelComponent,
      VideoComponent,
      VideoPopupComponent,
      MapComponent,
      SeoComponent
    ],

    providers: [
        // Services
    ],

    exports: [
      ImageSliderComponent,
      SeasonElementComponent,
      LeafComponent,
      SpookyComponent,
      SnowComponent,
      EnterpreneurComponent,
      PopUpModelComponent,
      VideoComponent,
      VideoPopupComponent,
      TranslateModule,
      MapComponent,
      SeoComponent
    ]
})

export class SharedModule { }

