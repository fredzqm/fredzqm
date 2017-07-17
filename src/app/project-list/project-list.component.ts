import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {Project} from '../project';
import {Router}    from '@angular/router';

@Component({
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
})

export class ProjectListComponent implements OnInit {

  projects: Project[];

  constructor(public _projectService: ProjectService, public router: Router) {
  }

  ngOnInit() {
    this._projectService.getProjects().then(projects => this.projects = projects);
  }

}
