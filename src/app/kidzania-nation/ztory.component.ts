declare var $: any;

import { Component, OnInit, Input, Inject} from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  templateUrl: './ztory.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class ZtoryComponent implements OnInit {
  @Input() ZtoryResponse: object;
  @Input() lang: String;
  activeTab = 'ztory-0'
  constructor(private ztoryService: DataService, @Inject(DOCUMENT) private document: Document, private _configuration: Configuration) {
    this.lang = _configuration.currLang;
  }
  ngOnInit() {
    this.getItem();
  }


  public getItem(): void {
    this.ztoryService
        .GetSingle('/marketing/sites/1/page_layouts/kidzania_ztory.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  public loadSlicker(): void{
    $('.ztory-slider').not('.slick-initialized').slick({
      rtl: (this.lang === 'ar' ? true : false),
      arrows:true,
      slidesToShow:7,
      infinite:false,
      swipeToSlide:true,
      touchThreshold:20,
      nextArrow:'<div class="ztory-next"><span class="glyphicon glyphicon-menu-right"></span></div>',
      prevArrow:'<div class="ztory-prev"><span class="glyphicon glyphicon-menu-left"></span></div>',
      responsive: [
        {
          breakpoint: 1246,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,

          }
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,

          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,

          }
        },
        {
          breakpoint: 601,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,

          }
        },
        {
          breakpoint: 468,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,

          }
        },
      ]
    });
  }

  private parseSiteData(data: object) {
    this.ZtoryResponse = data;
  }

  changeTail(id: any) {
      this.activeTab = id
  }

  changeTailandJump(id:any, item: any) {
    var targeitem = item+1;
    var target = id + targeitem;
    this.activeTab = target;
    this.document.getElementById(target).parentElement.scrollIntoView({behavior:"smooth"});
  }
}
