import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './awards.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class AwardsComponent implements OnInit {
  @Input() awardsResponse: object;
  constructor(private awardsService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.awardsService
        .GetSingle('/marketing/sites/1/page_layouts/awards.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.awardsResponse = data;
  }
}
