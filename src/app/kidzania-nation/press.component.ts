import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './press.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class PressComponent implements OnInit {
  @Input() pressResponse: object;
  constructor(private pressService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.pressService
        .GetSingle('/marketing/sites/1/page_layouts/press.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.pressResponse = data;
  }
}
