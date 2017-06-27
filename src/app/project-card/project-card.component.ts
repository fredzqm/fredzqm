import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../shared/project";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  host: {
    'class':'col-sm-12 col-md-6 col-lg-4'
  }
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
