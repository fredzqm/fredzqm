import { Component, OnInit } from '@angular/core';
import { Terminal } from './terminal';
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

  eval(input: string): Promise<string> {
    return new Promise((resolve) => {
      this.interpreter.on_error = function (error) {
        resolve(error.message);
      };
      const result: string = this.interpreter.evaluate(input);
      resolve(result);
    });
  }

  ngOnInit() {
    ReactDOM.render(
      React.createElement(Terminal, {
        intercept: this.eval,
        prompt: '$  >',
      }),
      document.getElementById('terminal')
    );
  }
}
