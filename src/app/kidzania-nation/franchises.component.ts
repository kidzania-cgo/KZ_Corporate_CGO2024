import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: './franchises.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class FranchisesComponent implements OnInit {
  @Input() franchisesResponse: object;
  constructor(private FranchiseService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.FranchiseService
        .GetSingle('/marketing/sites/1/page_layouts/franchise.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.franchisesResponse = data;
  }
}
