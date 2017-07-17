import {Component} from '@angular/core';
import {Project} from '../project';

@Component({
  selector: 'app-uml-generator-project',
  templateUrl: './uml-generator-project.component.html',
  styleUrls: ['./uml-generator-project.component.css']
})
export class UMLGeneratorProjectComponent {}

export const umlGeneratorProject: Project = {
  name: 'UML Generator',
  information: `UML generator is an extensible tool for generating a UML for any Java project. It parses the java bytecode with ASM library, and generate svg image via GraphViz. The UML includes the methods and fields of each class and their inheritance, dependency relationships. We also add design pattern detector or our UML generator. We have built-in support for detecting strategy, observer, decorator and adapter pattern. You may implement your own pattern detector.`,
  overview: null,
  image: 'assets/projects/DecLab.svg',
  repos: 'UMLGenerator',
  technologies: ['Java', 'GraphViz', 'Gradle'],
  detailComponent: UMLGeneratorProjectComponent
};
