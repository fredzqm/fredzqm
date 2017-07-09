import { Component, OnInit } from '@angular/core';
import {Project} from "../project";

@Component({
  selector: 'app-chess-project',
  templateUrl: './chess-project.component.html',
  styleUrls: ['./chess-project.component.css']
})
export class ChessProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

export const chessProject:Project = {
  id: 1,
  name: 'Chess',
  information: '',
  overview: `
      I love playing chess and I had so many free time in my <span mdTooltip="(They do not let my overload)" mdTooltipPosition="above">first quarter at Rose</span>, so I started this personal project.
  The code written by an newbie was functional but <a href="https://github.com/fredzqm/Chess/commit/7309b6d03c102e0c8ae55f55804d83edbef38d71">not so great in quality</a>.
In sophomore year thanksgiving break, I learned MVC pattern and realized that bad design was the reason it became so difficult to add new features to this project.
  I spent that week refactoring the code base into MVC pattern because I wanted to <a href="https://github.com/fredzqm/Chess/tree/ad5c9799e86579013170935618965c59cdbb7b11">make it great and add more features</a>.
In my junior year, I took a software evolution class which focuses on improving legacy code through refactoring. I was glad that my team (Coco Liu, John Hein and me) chose my little Chess project.
  We worked ambitiously, not only improved code quality, added tests and new features, but also put it onto the web.
  MVC design pattern shines because we can easily inject a fresh new web view while having the rest of the code base untouched.
  We built the frontend in Angular4 and used Firebase as the tier between Java backend and web frontend (https://fredzqm.github.io/Chess/).
I continued to work on my Chess app because I am passionate about what I enjoy and cannot tolerate mediocre result.
  The functional java applet created by the freshman newbie was functional but was going to die without a good design.
  I was not OK with spaghetti codes, so I spent time improving and growing them. This is just one of many projects I worked on and loved.
  I always pursue extensibility and have zero tolerant with poor design.` ,
  image: 'assets/Chess.png',
  repos: 'Chess',
  detailComponent: ChessProjectComponent,
};
