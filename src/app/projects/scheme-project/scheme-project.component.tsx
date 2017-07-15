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
    const oldEval = this.interpreter.evaluate.bind(this.interpreter);
    const newEval = function(x){
      const ret = oldEval(x);
      console.log('eval', x);
      console.log('return', ret);
      return ret;
    };
    this.interpreter.evaluate = newEval.bind(this.interpreter);
    this.interpreter.evaluate(`(load "assets/projects/main.ss")`);
    this.eval = this.eval.bind(this);
  }

  eval(input: string) : Promise<string> {
    return new Promise((resolve) => {
      console.log(input);
      const x = `(eval-one-exp '${input})`;
      console.log(x);
      const result = this.interpreter.evaluate(input);
      resolve('Entered: ' + result);
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
