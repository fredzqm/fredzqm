import {Project} from "../../project";
import {CPUProjectComponent} from './cpu-project.component';

export const cpuProejct: Project = {
  name: 'CPU Project',
  information: `This is a computer architecture project, where a team of four designed and implemented a 15-bit processor`,
  overview: null,
  image: 'assets/projects/datapath.png',
  repos: 'CPU',
  technologies: [],
  detailComponent: CPUProjectComponent,
};
