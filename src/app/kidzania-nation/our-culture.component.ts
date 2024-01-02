import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './our-culture.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class OurCultureComponent implements OnInit {
  @Input() ourCultureResponse: object;
  constructor(private ourCultureService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.ourCultureService
        .GetSingle('/marketing/sites/1/page_layouts/our_culture.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.ourCultureResponse = data;
  }
}
