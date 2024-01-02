import { Component, Input } from '@angular/core';

@Component({
  selector: 'season',
  templateUrl: './season-element.component.html'
})
export class SeasonElementComponent {
	@Input() seasonResponse: object;
}