import {Project} from "../../project";
import {CPUProjectComponent} from './cpu-project.component';

export const cpuProejct: Project = {
  name: 'CPU Project',
  information: `This is a mathematical research project about computing inverse laplace transform through numerical method. Based on Post’s Inversion Formula, we are trying to approximate inverse Laplace transform by solving high order differential equations. I built a MATLAB model that uses Picard Iteration to solve high order differential equations that consists of only plus, multiple operation. It can be shown that every differential equation can be converted into such form.`,
  overview: null,
  image: 'assets/projects/datapath.png',
  repos: 'CPU',
  technologies: [],
  detailComponent: CPUProjectComponent,
};
