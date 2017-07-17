import {Project} from './project';
import {chessProject} from "./projects/chess-project";
import {urlConnectProejct} from "./projects/url-connect-project";
import {schemeProject} from "./projects/scheme-project/scheme-project";
import {umlGeneratorProject} from './projects/uml-generator-project';
import {jobeeProject} from './projects/jobee-project';

export const ourProjects: Project[] = [
  chessProject,
  urlConnectProejct,
  schemeProject,
  umlGeneratorProject,
  jobeeProject,
];
