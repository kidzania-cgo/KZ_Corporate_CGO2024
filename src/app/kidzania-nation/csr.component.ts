import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './csr.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class CsrComponent implements OnInit {
  @Input() csrResponse: object;
  constructor(private CsrService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.CsrService
        .GetSingle('/marketing/sites/1/page_layouts/csr.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.csrResponse = data;
  }
}
