declare var $: any;

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from '../services/data-service/api.service';
import { Site } from '../shared/models/site.model';
import { Configuration } from '../app.constants';
import { HomeService } from './homepage.service';
import { Observable } from 'rxjs/Observable';
import { Contact }    from '../shared/models/contact.model';
import {MapComponent} from '../shared/components/map/map.component';

@Component({
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
    providers: [HomeService, Configuration, DataService]
})

export class HomepageComponent implements OnInit {
	contactModel = new Contact('','','','','','corporate','');
  countries = ["", "Afghanistan", "Albania", "Algeria", "American Samoa",
      "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina",
      "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
      "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
      "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire", "Bosnia & Herzegovina",
      "Botswana", "Brazil", "British Indian Ocean Ter", "Brunei", "Bulgaria", "Burkina Faso",
      "Burundi", "Cambodia", "Cameroon", "Canada", "Canary Islands", "Cape Verde", "Cayman Islands",
      "Central African Republic", "Chad", "Channel Islands", "Chile", "China", "Christmas Island",
      "Cocos Island", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote D'Ivoire",
      "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
      "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
      "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands",
      "Fiji", "Finland", "France", "French Guiana", "French Polynesia",
      "French Southern Ter", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
      "Great Britain", "Greece", "Greenland", "Grenada", "Guadeloupe",
      "Guam", "Guatemala", "Guinea", "Guyana", "Haiti", "Hawaii", "Honduras", "Hong Kong",
      "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland","Isle of Man",
      "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya","Kiribati",
      "Korea North", "Korea South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
	    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
	    "Macau", "Macedonia", "Madagascar", "Malaysia", "Malawi", "Maldives",
	    "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
	    "Mayotte", "Mexico", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montserrat",
	    "Morocco", "Mozambique", "Myanmar", "Nambia", "Nauru", "Nepal", "Netherland Antilles",
	    "Netherlands (Holland, Europe)", "Nevis", "New Caledonia", "New Zealand", "Nicaragua",
	    "Niger", "Nigeria", "Niue", "Norfolk Island", "Norway", "Pakistan", "Palau Island",
	    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Island",
	    "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of Montenegro", "Republic of Serbia",
	    "Reunion","Romania", "Russia", "Rwanda", "St Barthelemy", "St Eustatius", "St Helena",
	    "St Kitts-Nevis", "St Lucia", "St Maarten", "St Pierre & Miquelon", "St Vincent & Grenadines",
	    "Saipan", "Samoa", "Samoa American", "Sao Tome & Principe", "Saudi Arabia", "Senegal",
	    "Serbia", "Seychelles", "Sierra Leone", "Slovakia", "Slovenia", "Solomon Islands",
	    "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland",
	    "Sweden", "Switzerland", "Syria", "Tahiti", "Taiwan", "Tajikistan", "Tanzania",
	    "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey",
	    "Turkmenistan", "Turks & Caicos Is", "Tuvalu", "Uganda", "Ukraine","United Arab Emirates",
	    "United Kingdom", "United States of America", "Uruguay", "Uzbekistan","Vanuatu", "Vatican City State",
	    "Venezuela", "Vietnam", "Virgin Islands (Brit)", "Virgin Islands (USA)", "Wake Island", "Wallis & Futana Is",
	    "Yemen", "Zaire","Zambia", "Zimbabwe"]

    submitted = false;
    showModal = false;
    scrolled =0;
    public invalidCaptcha = false;
	  public SiteDetails: Site;
    @Input() response: object;
    constructor(private router: Router, private siteService: DataService, private _configuration: Configuration) { }

    @ViewChild('map') map: MapComponent;

    ngOnInit() {
      var langOnUrl = window.location.pathname.split('/')[1];
      let locales = JSON.parse(localStorage.getItem("locales"));
      if (langOnUrl && locales && locales.map((item: any) => item.locale.split('-')[0]).indexOf(langOnUrl) > -1) {
          this.getItem();
      } else {
          window.location.href = window.location.origin + '/en/404'
      }
    }

    public getItem(): void {
        this.siteService
            .GetSingle('/marketing.json')
            .subscribe((data) => this.parseSiteData(data),
                error => console.log(error),
                () => console.log('Get site details complete'));
    }

    private parseSiteData(data: object) {
        this.response = data;
    }

    hideLegalError() {
      $('#legal_error').hide();
    }

    submitContact() {
      var name = this.contactModel.name
      var email = this.contactModel.email
      var company = this.contactModel.company
      var source = this.contactModel.source
      var country = this.contactModel.country
      var comment = this.contactModel.message
      var topic = this.contactModel.topic
      var captchToken = $('#g-recaptcha-response').val();
      var legalPresent = $('#legal_note_check').length;
      var currLang = 'en'

      if (captchToken == "") {
        this.invalidCaptcha = true;
      }
      if (legalPresent != 0 && !$('#legal_note_check')[0].checked) {
        this.submitted = false;
        $('#legal_error').show();
      }
      else if(name != "" && email != "" && company != "" && country != "" && comment != "" && topic != "" && captchToken != ""){
        this.siteService
            .Add('/inquiries.json', {name: name, company: company, country: country, message: comment, email: email, source: 'corporate', topic: topic, 'g-recaptcha-response': captchToken})
            .subscribe((data) => console.log(data),
                error => this.invalidCaptcha = true,
                () => console.log('Get site details complete'));
        this.submitted = false;
        currLang = window.location.pathname.split('/')[1] || 'en-uk';
        this.router.navigate([currLang+'/thank-you']);
        location.reload();
      }
      else {
      	this.submitted = false;
      }
    }

    embedVideo(url: any) {
      var embedUrl = url.replace("watch?v=", "embed/");
      $('#videoContainerIframe')[0].src = embedUrl
    }

    updateWidgetLink(url: any) {
      $('#widget-link').attr('href', url);
    }

    public gotoRefernece() {
      if (location.hash) {
        var elements = location.hash.split('#')
        if (elements.length > 1 && this.scrolled<=2) {
          document.getElementById(elements[1]).scrollIntoView({behavior:"smooth"});
          this.scrolled =this.scrolled+1;
        } else {
          $('#content-list').collapse('hide')
        }
      }
    }
}
