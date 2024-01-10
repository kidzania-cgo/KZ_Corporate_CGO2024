declare var $: any;

import { Component, Input, Inject, ElementRef} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  constructor(private sanitized: DomSanitizer, private elementRef:ElementRef) {}
	@Input() mapResponse: any;

  sanitizedRegions: { location_description: SafeHtml }[] = [];

  setRegionDescription(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  enableToolTip() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "./../../../../assets/js/show_tooltip.js";
      this.elementRef.nativeElement.appendChild(script);
  }

  ngOnChanges() {
    if (this.mapResponse && this.mapResponse.regions) {
      this.sanitizedRegions = this.mapResponse.regions.map((region: any) => ({
        location_description: this.setRegionDescription(region.location_description || '')
      }));
    } else {
      this.sanitizedRegions = [];
    }
  }
}
