declare var $: any;

import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Contact }    from '../shared/models/career-contact.model';
import { DataService } from '../services/data-service/api.service';


@Component({
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
  providers: [Configuration, DataService]
})

export class CareersComponent implements OnInit {
  @Input() CareersResponse: object;
  @Input() lang: String;
  contactModel = new Contact('','','','','','corporate',null,null);
  constructor(private router: Router, private careerService: DataService, private _configuration: Configuration) { 
    this.lang = _configuration.currLang;
  }
  ngOnInit() {
    this.redirect_to_english() //only en and es job adverts are available
    this.getItem();
  }
  public getItem(): void {
    this.careerService
        .GetSingle('/marketing/sites/1/careers.json')
        .subscribe((data) => this.parseSiteData(data),
            error => console.log(error),
            () => console.log('Get site details complete'));
  }

  private parseSiteData(data: object) {
    this.CareersResponse = data;
  }

  showCategory(category_id: any) {
    $('.single-column.car-cat.careers').hide();
    $(category_id).show();
    $(category_id)[0].scrollIntoView({behavior: "smooth", block: "nearest"});
  }

  hideLegalError() {
    $('#legal_error').hide();
  }

  redirect_to_english() {
    if ((this.lang !== "en") && (this.lang !== "es")) {
      window.location.href = window.location.origin + '/en/careers'
    }
  }

  public invalidCaptcha = false;
  submitted = false;

  submitCareerContact() {
    $('#name, #surname, #inputEmail, #phone, #file1').next().hide();
    var name = this.contactModel.name
    var email = this.contactModel.email
    var surname = this.contactModel.surname
    var source = this.contactModel.source
    var phone = this.contactModel.phone
    var position = $("input[name ='inputPosition']").val();
    var captchToken = $('#g-recaptcha-response').val();
    var legalPresent = $('#legal_note_check').length;
    var link = $('#link').val();
    var errorsArray = this.validateForm();

    if (!captchToken || captchToken == "") {
      this.invalidCaptcha = true;
    }
    if (legalPresent != 0 && !$('#legal_note_check')[0].checked) {
      this.submitted = false;
      $('#legal_error').show();
    }
    else if (errorsArray && errorsArray.length) {
      for(var i =0; i < errorsArray.length; i++) {
        $(errorsArray[i]).next().show();
      }
      errorsArray[0].scrollIntoView({behavior: "smooth", block: "nearest"});
    }
    else if (!this.contactModel.file1) {
      $('#file1').next().show();
      $('#file1')[0].scrollIntoView({behavior: "smooth", block: "nearest"});
    }
    else if(name != "" && email != "" && surname != "" && phone != "" && position != "" && captchToken != ""){
      this.careerService
          .Addv2('/marketing/contact_career.json', {name: name, surname: surname, phone: phone, position: position, email: email, source: 'corporate', 'g-recaptcha-response': captchToken, file1: this.contactModel.file1, file2: this.contactModel.file2, link: link})
          .subscribe((data) => console.log(data),
              error => this.invalidCaptcha = true,
              () => console.log('Get site details complete'));
      if (this.invalidCaptcha != true) {
        this.submitted = true;
        this.hideContact()
      }
    }
    else {
      this.submitted = false;
    }
  }

  validateForm() {
    var errorsArray= [];
    var requiredElements = $('input,textarea,select').filter('[required]');
    for(var i=0; i < requiredElements.length; i++) {
        if(!$(requiredElements[i]).val()) {
           errorsArray.push(requiredElements[i])
        }
    }

    return errorsArray;
  }

  hideContact() {
    if (this.submitted == true) {
      $("#zankYou").show();
      $("#careerContact").hide();
    }
  }

  createContact(job: any){
    $("#job_title").html(job.title);
    $("#job_sub_title").html(job.sub_title);
    $("#job_body").html(job.body);
    $("#job_contact_body").html(job.contact_body);
    $("#job_contact_title").html(job.contact_title);
    $("#job_header_image").css('background-image', 'url(' + job.header_image + ')');
    $("#zankYou").hide();
    $("#careerContact").show();
    $("#careerContact").find("input").val("");
    $("input[name ='inputPosition']").val(job.title);
    this.submitted = false;
    this.invalidCaptcha = false;
  }

  onFileChange(files: FileList, identifier: string) {
    let reader = new FileReader();
    if(files && files.length > 0) {
      let file = files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (identifier === 'fileOne') {
          this.contactModel.file1 = {
            'filename': file.name,
            'value': reader.result
          };
        } else if (identifier === 'fileTwo') {
          this.contactModel.file2 = {
            'filename': file.name,
            'value': reader.result
          };
        }
      };
      reader.onerror = () => {
        console.log('Upload Failed!');
      }
    }
  }
}
