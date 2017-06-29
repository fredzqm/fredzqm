import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project';
import {Router} from '@angular/router';
import {StoneCutter} from './reactComponent';
import * as React from "react";
import * as ReactDOM from "react-dom";

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements OnInit {
  projects: Project[];

  constructor(public _projectService: ProjectService) {
  }

  ngOnInit() {
    this._projectService.getProjects()
      .then(projects => projects.slice(-3))
      .then(projects => this.projects = projects);

    ReactDOM.render(
      <StoneCutter></StoneCutter>,
      document.getElementById("xxx")
    );
  }
}
