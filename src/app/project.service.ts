import { Injectable } from '@angular/core';
import { Project } from './project';


const data : Project[] = [{
  	title: "Chess",
  	repos: "https://github.com/fredzqm/Chess",
  	imageUrl: "assets/Chess.png",
  	description: "This is my grand chess game, it is an Java Chess app I build just after I took my very first programming class",
  	tools: ["java"]
},{
  	title: "Chess",
  	repos: "https://github.com/fredzqm/Chess",
  	imageUrl: "assets/Chess.png",
  	description: "This is my grand chess game",
  	tools: ["java"]
},{
  	title: "Chess",
  	repos: "https://github.com/fredzqm/Chess",
  	imageUrl: "assets/Chess.png",
  	description: "This is my grand chess game",
  	tools: ["java"]
}];

@Injectable()
export class ProjectService {

  constructor() { }

  getProjects() : Promise<Project[]> {
  	return Promise.resolve(data);
  }

}
