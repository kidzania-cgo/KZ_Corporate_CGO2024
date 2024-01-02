import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './company-info.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class CompanyInfoComponent implements OnInit {
  @Input() companyInfoResponse: object;
  constructor(private companyInfoService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.companyInfoService
        .GetSingle('/marketing/sites/1/page_layouts/company_info.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.companyInfoResponse = data;
  }
}
