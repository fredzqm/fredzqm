import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Terminal} from './terminal';

@Component({
  selector: 'app-scheme-project',
  templateUrl: './scheme-project.component.html',
  styleUrls: ['./scheme-project.component.css']
})
export class SchemeProjectComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    ReactDOM.render(
      <Terminal></Terminal>,
      document.getElementById('terminal')
    );
  }
}

export const schemeProject: Project = {
  name: 'Scheme Interpreter',
  information: `This is a Scheme interpreter project for CSSE304(Programming language concept) course at Rose.`,
  overview: null,
  image: 'assets/projects/url_connect.png',
  repos: 'Scheme_interpreter',
  technologies: ["Scheme"],
  detailComponent: SchemeProjectComponent,
};
