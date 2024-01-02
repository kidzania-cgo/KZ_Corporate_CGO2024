import { Component, OnInit, Input, HostListener, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './services/data-service/api.service';
import { Configuration } from './app.constants';
import { DOCUMENT } from '@angular/platform-browser';
import { Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Configuration, DataService, TranslateService]
})
export class AppComponent implements OnInit {
  activeTab = ''
  currLang = ''
  currentLanguage = ''
  fonts = {}


  constructor(private router: Router, private translate: TranslateService, private headerService: DataService, @Inject(DOCUMENT) private document: Document, private _configuration: Configuration) {
    this.fonts = _configuration.Langfonts;
    translate.addLangs(['en', 'es']);
    this.currLang = window.location.pathname.split('/')[1] || 'en'
    translate.setDefaultLang('en');
    translate.use(this.currLang);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    var currUrl = this.router.url.split('/');
    currUrl[1] = lang;
    var newUrl = currUrl.join('/');
    this.translate.store.currentLang = lang;
    this.currLang = this.translate.store.currentLang;
    location.replace(newUrl);
  }

  loadrtlCss() {
    var ss = document.getElementsByTagName('link')
    for (var i = 0, max = ss.length; i < max; i++) {
        if (ss[i].href !== null && ss[i].href.match('bootstrap-rtl.css'))
            return;
    }
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "./../../src/assets/styles/css/bootstrap-rtl.css")
    if (typeof fileref != "undefined") {
      document.getElementsByTagName("head")[0].appendChild(fileref)
    }
  }

  loadlangFont(currLang: any) {
    var font_url = this.fonts[currLang]
    var ss = document.getElementsByTagName('link')
    for (var i = 0, max = ss.length; i < max; i++) {
        if (ss[i].href !== null && ss[i].href === font_url)
            return;
    }
    if (typeof font_url != "undefined") {
      var fileref = document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", font_url)
      document.getElementsByTagName("head")[0].appendChild(fileref)
    }
  }

  @Input() headerFooter: object;
  @Input() locales: any;

  ngOnInit() {
      this.getItem();
  }

  public getItem(): void {
      this.headerService
          .GetSingle('/marketing/sites/1/header_and_footer.json')
          .subscribe((data) => this.parseSiteData(data),
              error => console.log(error),
              () => console.log('Get site details complete'));
  }

  private parseSiteData(data: any) {
      this.headerFooter = data;
      this.locales = data.locales
      this.currentLanguage = this.getCurrentLang(this.locales)
      this.saveActiveLocales(this.locales)
  }

  getCurrentLang(locales: any) {
    // find name of current language using currLang and locales data
    if (this.isUrlValid(locales)) {
      return locales.filter((item: any) => item.locale.split('-')[0] === this.currLang)[0].name;
    }
    return 'English';
  }

  isUrlValid(locales: any) {
    return (this.currLang && locales && locales.filter((item: any) => item.locale.split('-')[0] === this.currLang).length > 0)
  }

  saveActiveLocales(locales: any) {
    localStorage.setItem('locales', JSON.stringify(locales))
  }

  showSubMenu(event: any){
    var item = event.target
    if (item.id) {
      this.activeTab = item.id
    }
  }

  hideSubMenu(event: any){
    this.activeTab = ''
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this.document.body.scrollTop;
    let navSpy = this.document.getElementById('navSpy');
    if (navSpy && number >= 550) {
      navSpy.style.marginTop = "0px";
    } else {
      if (navSpy && this.document.documentElement.scrollTop >= 550){
        navSpy.style.marginTop = "0px";
      } else {
        navSpy.style.marginTop = '-90px';
      }
    }
  }

  public validateUrl(url: any) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(url);
  }

  public constructUrl(url: any) {
    if(url) {
      var l = document.createElement("a");
      l.href = url;
      return l;
    }
  }

  public activeMenu(menu: any) {
    let urls: string[] = [];
    if (menu.url) {
      if (this.validateUrl(menu.url)) {
        let url = this.constructUrl(menu.url);
        urls.push(url.pathname+url.hash);
      }
      else {
        urls.push(menu.url);
      }
    }
    if (menu.sub_menus.length > 0) {
      let urlBuilder = function(url: any) {
        var tempHrefHolder = document.createElement("a");
        tempHrefHolder.href = url;
        return tempHrefHolder;
      }
      let innerPageUrls = menu.sub_menus.map(function(a: any) {return a.url;});
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      let validUrls = innerPageUrls.map(function(url: any) {return regexp.test(url) ? urlBuilder(url).pathname : url});
      validUrls.map(function(url: any) {urls.push(url)})
    }
    return urls;
  }

  public currentURL() {
    let pathUrl = window.location.pathname;
    return pathUrl+window.location.hash;
  }

  public checkMenuActive(menu:any) {
    var activeItem = this.activeMenu(menu);
    var curUrl = this.currentURL();
    var urlWithourHash = curUrl.split('#')[0];
    // Patch for IE since initial slash is not identifying
    return (activeItem.indexOf(curUrl) > -1 || activeItem.indexOf(curUrl.substr(1)) > -1 ||
     activeItem.indexOf(urlWithourHash) > -1 || activeItem.indexOf(urlWithourHash.substr(1)) > -1);
  }

  public ActivePage(subMenu: any) {
    let pathUrl = window.location.pathname;
    let menuUrl = subMenu.url
    if (menuUrl) {
      // Patch for IE since initial slash is not identifying
      if (this.validateUrl(menuUrl)) {
        let url = this.constructUrl(menuUrl);
        return (pathUrl == url.pathname || pathUrl.substr(1) == url.pathname);
      }
      else {
        return (pathUrl == menuUrl || pathUrl.substr(1) == menuUrl);
      }
    }
  }

  addCookie() {
    Cookie.set('visited', 'yes');
  }

  cookieSet() {
    return Cookie.get('visited') != 'yes'
  }

  setFavicon(nl_activated: any, icon: any) {
    if(nl_activated) {
      this.document.getElementById('appFavicon').setAttribute('href', icon);
    }
  }

  IsWhatsKidzania() {
    return (this.router.url.split('/')[2].split('#')[0] === 'what-is-kidzania')
  }
}
