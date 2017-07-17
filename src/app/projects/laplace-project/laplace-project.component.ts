import {Component} from '@angular/core';

@Component({
  selector: 'app-laplace-project',
  template: `
    <pdf-viewer
      src="/paper/laplace.pdf"
      [zoom]="1.9"
      page="page"
      [render-text]="true"
      [show-all]="true">
    </pdf-viewer>
  `
})
export class LaplaceProjectComponent {
}
