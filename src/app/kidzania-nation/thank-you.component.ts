import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './thank-you.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class ThankYouComponent implements OnInit {
  @Input() thankYouResponse: object;
  constructor(private thankYouService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.thankYouService
        .GetSingle('/marketing/sites/1/page_layouts/thank_you_page.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.thankYouResponse = data;
  }
}
