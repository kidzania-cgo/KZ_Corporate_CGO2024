import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './b-kidzanian.component.html',
  styleUrls: ['./b-kidzanian.component.css'],
  providers: [Configuration, DataService]
})

export class BKidzanianComponent implements OnInit {
  @Input() bkidzanianResponse: object;
  constructor(private bkidzaniaService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.bkidzaniaService
        .GetSingle('/marketing/sites/1/page_layouts/b_kidzanian.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.bkidzanianResponse = data;
  }
}
