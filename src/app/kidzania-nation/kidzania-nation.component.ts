import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './kidzania-nation.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class KidzaniaNationComponent implements OnInit {
  @Input() KidzaniaNationResponse: object;
  constructor(private kidzNationService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.kidzNationService
        .GetSingle('/marketing/sites/1/page_layouts/kidzania_nation.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.KidzaniaNationResponse = data;
  }
}
