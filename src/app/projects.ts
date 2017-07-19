import {Project} from './project';
import {chessProject} from './projects/chess-project';
import {urlConnectProejct} from './projects/url-connect-project';
import {schemeProject} from './projects/scheme-project/scheme-project';
import {umlGeneratorProject} from './projects/uml-generator-project';
import {jobeeProject} from './projects/jobee-project';
import {laplaceProejct} from './projects/laplace-project/laplace-project';
import {diggerGameProject} from './projects/digger-game-project';
import {operatingSystemProject} from './projects/operating-system-project';
import {mapProejct} from './projects/map-project';
import {dPSMProejct} from './projects/dPSM';

export const ourProjects: Project[] = [
  chessProject,
  umlGeneratorProject,
  schemeProject,
  jobeeProject,
  mapProejct,
  urlConnectProejct,
  // operatingSystemProject,
  laplaceProejct,
  dPSMProejct,
  diggerGameProject,
];
