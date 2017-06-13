import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project';
import {Router}    from '@angular/router';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements OnInit {
  projects: Project[];

  constructor(public _projectService: ProjectService, public router: Router) {
  }

  chooseProject(project) {
    this.router.navigate(['detail', project.id]);
  }

  ngOnInit() {
    this._projectService.getProjects()
      .then(projects => projects.slice(-3))
      .then(projects => this.projects = projects);
  }

}