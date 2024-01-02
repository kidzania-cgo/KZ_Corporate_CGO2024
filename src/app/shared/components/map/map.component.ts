declare var $: any;

import { Component, Input, Inject, ElementRef} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  constructor(private sanitized: DomSanitizer, private elementRef:ElementRef) {}
	@Input() mapResponse: object;

  setRegionDescription(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  enableToolTip() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "./../../../../assets/js/show_tooltip.js";
      this.elementRef.nativeElement.appendChild(script);
  }
}
