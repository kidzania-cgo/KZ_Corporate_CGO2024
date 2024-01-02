import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './privacy.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class PrivacyComponent implements OnInit {
  @Input() privacyResponse: object;
  constructor(private privacyService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.privacyService
        .GetSingle('/marketing/sites/1/privacies.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.privacyResponse = data;
  }
}
