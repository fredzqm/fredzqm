import {Component, Input} from '@angular/core';
import {Project} from '../../project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  host: {
    'class': 'col-sm-12 col-md-6 col-lg-4 col-xl-3'
  }
})
export class ProjectCardComponent {
  @Input() project: Project;

  constructor() {
  }

  showRepos($event) {
    window.open('https://github.com/fredzqm/' + this.project.repos, '_blank');
    $event.stopPropagation();
  }
}
