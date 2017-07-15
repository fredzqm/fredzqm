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
  information: `This is a Scheme interpreter project for CSSE304(Programming language concept) course at Rose. Apart from implementing the required syntax including, lambda, set!, if, let, letrec, etc, I also implement define-syntax, which gives my interpreter the ultimate extensibility.` ,
  overview: `
<p>
  Scheme a small programming language that can be defined in <a href="http://scheme.com/tspl4/further.html#./further:h0">a single-page context-free grammar</a>, with only five core keywords. Each of them matches to a core programming language concept.
</p>
<ol>
  <li>lambda (closure)</li>
  <li>set! and define (assignment)</li>
  <li>if (condition)</li>
  <li>literal (quote)</li>
</ol>
<p>
  Scheme is an extensibility <a href="https://www.youtube.com/watch?v=_ahvzDzKdB0" target="_blank">growing language</a>. Instead of introducing more keywords to the language, Scheme embraces <a href="http://scheme.com/tspl4/syntax.html#./syntax:s12">define-syntax</a>, a framework to define new syntax as equivalent existing expressions. With no primitive loop, Scheme actually achieves loops through recursion.
</p>
<p>
  I built a Scheme in our <a href="http://www.rose-hulman.edu/class/cs/csse304/201630/Schedule/Schedule.htm" target="_blank">programming programming concepts course</a> Within the interpreter project, I went beyond the expectation and implemented define-syntax, which significantly reduces the marginal development time to add a additional syntax to my interpreter. That is why I enjoy building framework and extensible software.
</p>
<p>
Scheme is a functional programming language. I learned about continuation from Scheme and found power in callbacks and asynchronous event-based programming. In fact, we went a bit forward and implement <a href="http://scheme.com/tspl4/control.html#./control:s54">call-with-current-continuation (call/cc)</a> in our interpreter. Call/cc highlights the key concept behind exception handling and Promise.
</p>
<p>
This scheme project is in <a href="http://www.scheme.com/">Chez Scheme</a>, which does not have a javascript library. I found <a href="http://www.biwascheme.org/">Biwascheme</a>, something similar in npm and added an interactive shell here, so you can play with Scheme here.
The codes in the image show a syntax expansion rule for while loop. It only works in my interpreter (not Chez Scheme or Biwascheme), but I found it to be a very elegant though convoluted way of implementing while loop with the fundamental buidling blocks of programming concepts.
</p>
`,
  image: 'assets/projects/scheme_project.png',
  repos: 'Scheme_interpreter',
  technologies: ['Scheme'],
  detailComponent: SchemeProjectComponent,
};
