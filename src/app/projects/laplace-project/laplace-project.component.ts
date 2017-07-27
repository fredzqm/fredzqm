import {Component} from '@angular/core';

@Component({
  selector: 'app-laplace-project',
  template: `
    <app-read-me repos="laplace"></app-read-me>
    <pdf-viewer
      src="https://raw.githubusercontent.com/fredzqm/laplace/master/paper/laplace.pdf"
      [zoom]="1.9"
      page="page"
      [render-text]="true"
      [show-all]="true">
    </pdf-viewer>
  `
})
export class LaplaceProjectComponent {
}
