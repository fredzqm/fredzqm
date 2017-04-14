import { Component } from '@angular/core';
import { Project } from './project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  x : Project = {
  	title: "Chess",
  	repos: "https://github.com/fredzqm/Chess",
  	imageUrl: "assets/Chess.png",
  	description: "This is my grand chess game",
  	tools: ["java"]
  };
}
