declare var $: any;

import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-popup-model',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.css']
})
export class VideoPopupComponent {
	@Input() videoResponse: object;
	public safeUrl: SafeResourceUrl;
	constructor(public sanitizer: DomSanitizer){}

	stopVideo() {
       $('#videoContainerIframe')[0].src = ''
	}
}