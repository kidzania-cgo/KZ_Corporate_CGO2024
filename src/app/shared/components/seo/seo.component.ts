import { Component, Input } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'seo',
  templateUrl: './seo.component.html'
})
export class SeoComponent {
	@Input() seoResponse: object;
  @Input() need_to_set: boolean;
	constructor(private metaService: MetaService) {}
  ngOnInit() {
    this.need_to_set = true
  }
	public setSeo(title: any, description: any, keywords: any) {
    if (this.seoResponse && this.need_to_set) {
      this.need_to_set = false
      this.metaService.setTitle(title);
      this.metaService.setTag('og:description', description);
      this.metaService.setTag('og:keywords', keywords);
    }
  }
}
