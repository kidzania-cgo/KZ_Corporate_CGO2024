declare var $: any;

import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './what-is-kidzanian.component.html',
  styleUrls: ['./what-is-kidzanian.component.css'],
  providers: [Configuration, DataService]
})

export class WhatIsKidzanianComponent implements OnInit {
  @Input() whatIsKzResponse: object;
  constructor(private whatIsKZService: DataService, private _configuration: Configuration) { }
  ngOnInit() {
    this.getItem();
  }
  scrolled = false;
  public getItem(): void {
    this.whatIsKZService
        .GetSingle('/marketing/sites/1/page_layouts/what_is_kidzania.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.whatIsKzResponse = data;
  }

  public gotoRefernece() {
    if (location.hash) {
      var element = location.hash
      if ($(element).length > 0 && this.scrolled==false) {
        $(element)[0].scrollIntoView({behavior:"smooth"});
        this.scrolled =true;
      } else {
        $('#content-list').collapse('hide')
      }
    }
  }
}
