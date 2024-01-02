declare var $: any;

import { Component, Input } from '@angular/core';

@Component({
  selector: 'snow',
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.css']
})
export class SnowComponent  {
  @Input() seasonResponse: object;

  ngOnInit() {
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 400) {
          $("#navSpy").css("margin-top","0");
          $(".var-prog-mobile-wrap").css("bottom","0");
      }
      else {
          $("#navSpy").css("margin-top","-90px");
          $(".var-prog-mobile-wrap").css("bottom","-200px");
      }
    });
    $('.vp-close').click(function(){
      $('.var-prog').fadeOut();
      $('.var-prog-mobile-wrap').fadeOut();
      $('.vp-particle').fadeOut();
    });
  }
}
