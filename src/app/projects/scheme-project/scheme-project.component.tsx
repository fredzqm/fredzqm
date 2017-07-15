import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {Terminal} from './terminal';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-scheme-project',
  templateUrl: './scheme-project.component.html',
  styleUrls: ['./scheme-project.component.css']
})
export class SchemeProjectComponent implements OnInit {
  interpreter: any;

  constructor() {
    this.interpreter = new BiwaScheme.Interpreter();
    this.eval = this.eval.bind(this);
  }

  eval(input: string) : Promise<string> {
    return new Promise((resolve) => {
      this.interpreter.on_error = function(error) {
        resolve(error.message);
      };
      const result: string = this.interpreter.evaluate(input);
      resolve(result);
    });
  }

  ngOnInit() {
    ReactDOM.render(
      <Terminal interpreter={this.eval} prompt={'$ >'}></Terminal>,
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
  technologies: ['Scheme'],
  detailComponent: SchemeProjectComponent,
};
