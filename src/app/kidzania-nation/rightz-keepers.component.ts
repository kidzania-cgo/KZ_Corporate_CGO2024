import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../services/data-service/api.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  templateUrl: './rightz-keepers.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [Configuration, DataService]
})

export class RightzComponent implements OnInit {
  @Input() RightzResponse: object;
  activeTab = 'rightz-0'
  currLang = ''
  constructor(private ztoryService: DataService, @Inject(DOCUMENT) private document: Document) {
    this.currLang = window.location.pathname.split('/')[1] || 'en'
  }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.ztoryService
        .GetSingle('/marketing/sites/1/page_layouts/rightz_keepers.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.RightzResponse = data;
  }

  changeTail(id: any) {
      this.activeTab = id
      this.document.getElementById('info-anchor').scrollIntoView({behavior:"smooth"});
  }
}
