import { Component, Input, Inject } from '@angular/core';
@Component({
  selector: 'pop-up-model',
  templateUrl: './pop-up-model.component.html',
  providers: [
      { provide: Window, useValue: window }
  ],
  styleUrls: ['./pop-up-model.component.css']
})
export class PopUpModelComponent {
	@Input() PopUpResponse: object;
	constructor(@Inject(Window) private window: Window){}
	scrollToTop(id: any) {
        this.window.document.getElementById(id).scrollIntoView();
	}
}