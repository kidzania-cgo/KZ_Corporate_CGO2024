declare var $: any;

import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DataService } from '../services/data-service/api.service';

@Component({
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
  providers: [Configuration, DataService]
})

export class SeasonComponent { }
