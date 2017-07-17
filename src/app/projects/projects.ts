import {Project} from './project';
import {chessProject} from "./chess-project/chess-project.component";
import {urlConnectProejct} from "./url-connect-project/url-connect-project.component";
import {schemeProject} from "./scheme-project/scheme-project.component";
import {umlGeneratorProject} from './uml-generator-project/uml-generator-project.component';
import {jobeeProject} from './jobee-project/jobee-project.component';

export const ourProjects: Project[] = [
  chessProject,
  urlConnectProejct,
  schemeProject,
  umlGeneratorProject,
  jobeeProject,
];
