import { Component, OnInit, Input} from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data-service/api.service';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./kidzania-nation.component.css'],
  providers: [ DataService]
})

export class NotFoundComponent implements OnInit{
  @Input() socialMediaResponse: object;
  constructor(private socialMediaService: DataService) { }
  ngOnInit() {
    this.getItem();
  }

  public getItem(): void {
    this.socialMediaService
        .GetSingle('/marketing/sites/1/sm_icons.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get details complete'));
  }

  private parseSiteData(data: object) {
    this.socialMediaResponse = data;
  }
}
