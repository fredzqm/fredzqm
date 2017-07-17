import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-read-me',
  templateUrl: './read-me.component.html',
  styleUrls: ['./read-me.component.css'],
  host: {
    'class': 'card'
  }
})
export class ReadMeComponent {
  @Input() repos: string;
  @Input() path: string;
}
