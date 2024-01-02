declare var $: any;

import { Component, Input } from '@angular/core';

@Component({
  selector: 'video-section',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
	@Input() response: object;

  public MobileView(indexOfelement: any, width: any) {
    var objId = 'Slider-' + indexOfelement;
    if ($(window).width() < 769) {
      $('#' + objId).css('background-position', ''+width+'% top');
    }
    else{
      $('#' + objId).css('background-position', 'center');
    }
  }

	public SlideImages(sliderInterval: any) {
		var Interval = "{{sliderInterval}}" ? sliderInterval : "000";
		var IsIntervalActive = "{{sliderInterval}}" ? true : false

		$('#main-slider').owlCarousel({
	      autoplay: IsIntervalActive,
	      autoPlaySpeed: Interval,
          autoPlayTimeout: Interval,
	      loop:true,
	      margin:1,
	      nav:true,
	      dots:false,
	      navText:['<span class="glyphicon glyphicon-menu-left"></span>','<span class="glyphicon glyphicon-menu-right"></span>'],
	      responsive:{
	          0:{
	              items:1
	          },
	          600:{
	              items:1
	          },
	          1000:{
	              items:1
	          }
	      }
		})
	}

   public gotoRefernece(id: any) {
      $('#what')[0].scrollIntoView({behavior:"smooth"});
   }
}
