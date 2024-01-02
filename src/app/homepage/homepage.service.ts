import { Injectable, Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DataService } from '../services/data-service/api.service';
import { Site } from '../shared/models/site.model';
import { Configuration } from '../app.constants';
@Injectable()


export class HomeService implements OnInit {
    ngOnInit() {
    }
}

