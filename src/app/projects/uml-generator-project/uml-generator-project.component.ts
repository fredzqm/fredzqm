import {Component, OnInit} from '@angular/core';
import {Project} from '../project';

@Component({
  selector: 'app-uml-generator-project',
  templateUrl: './uml-generator-project.component.html',
  styleUrls: ['./uml-generator-project.component.css']
})
export class UMLGeneratorProjectComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

export const umlGeneratorProject: Project = {
  name: 'UML Generator',
  information: `This is a chrome extension chat room app built in React. The main idea is to talk to people who are visiting the same website. Based on the url in your browser, you will be in a different chat room. We use firebase to keep track of users at each url and messages history. Whenever all users left the room, the room is removed to save storage. We also support private room with a token and video chat via WebRTC.`,
  overview: null,
  image: 'assets/projects/url_connect.png',
  repos: 'UMLGenerator',
  technologies: ['Java', 'GraphViz'],
  detailComponent: UMLGeneratorProjectComponent
};
