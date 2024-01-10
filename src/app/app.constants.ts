import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

    constructor() {
      this.addDefaultEnglishTolocales()
    }

    public apiLang: string = this.getApiLang();
    public currLang: string = this.getCurrLang();
    public Server: string = "http://kzdelta.com/";
    // public Server: string = "http://london.kidzania.com:3000/"
    public Langfonts: object = {ar:'https://fonts.googleapis.com/css?family=Cairo:400,600,700,900&subset=arabic', 
                                th:'https://fonts.googleapis.com/css?family=Kanit:400,700,900&subset=thai', 
                                ko:'https://fonts.googleapis.com/css?family=Gothic+A1:900|Noto+Sans+KR:400,700,900', 
                                ja:'https://fonts.googleapis.com/css?family=M+PLUS+1p:900|Noto+Sans+JP:400,800,900&subset=japanese'};

    public getCurrLang(): any {
      var langOnUrl = window.location.pathname.split('/')[1];
      let locales = JSON.parse(localStorage.getItem("locales"));
      if(this.isUrlValid(langOnUrl, locales)) {
         return langOnUrl;
      }else {
         return 'en';
      }
    }

    public getApiLang(): any {
      var langOnUrl = window.location.pathname.split('/')[1];
      let locales = JSON.parse(localStorage.getItem("locales"));
      if (this.isUrlValid(langOnUrl, locales)) {
         return locales.filter((item: any) => item.locale.split('-')[0] === langOnUrl)[0].locale.toLowerCase();
      } else {
         return 'en-uk';
      }
    }
  
    isUrlValid(langOnUrl: any, locales: any) {
      return (langOnUrl && locales && locales.filter((item: any) => item.locale.split('-')[0] === langOnUrl).length > 0)
    }

    addDefaultEnglishTolocales () {
      let locales = JSON.parse(localStorage.getItem("locales"));
      if (!locales) {
        localStorage.setItem('locales', JSON.stringify([{name: "English", locale: "en-UK", is_active: true}]))
      }
    }
}
