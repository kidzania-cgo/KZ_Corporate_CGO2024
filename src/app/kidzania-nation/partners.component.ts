declare var $: any;

import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './partners.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})
export class PartnersComponent implements OnInit {
  @Input() partnersResponse: object;
  constructor(private PartnerService: DataService) { }

  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.PartnerService
        .GetSingle('/marketing/sites/1/page_layouts/partners.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.partnersResponse = data;
  }

  public SlidePartnerList(): void {
    $('#ip-slider').owlCarousel({
      loop:true,
      autoplay:true,
      autoplayTimeout:4000,
      autoplayHoverPause:true,
      margin:1,
      dots:true,
      nav:true,
      slideBy:'page',
      navSpeed:200,
      autoplaySpeed:300,
      navText:['<span class="glyphicon glyphicon-menu-left"></span>',
      '<span class="glyphicon glyphicon-menu-right"></span>'],
      responsive:{
          0:{
              items:2
          },
           650:{
              items:3
          },
          800:{
              items:5
          },
          1200:{
              items:7
          }
      }
    });

  }
}
