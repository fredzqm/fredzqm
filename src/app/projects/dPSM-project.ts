import {Project} from '../project';

export const dPSMProejct: Project = {
  name: 'dPSM',
  information: `
    This is a research project to solve delayed differential equation numerically with PSM. 
    This is a continuation of the Laplace research project with Dr. Isaia.
    In MATLAB, I use template pattern to create a framework for defining computation rules for each iterations.
    Within the framework, we can specify the relationship among each component of the delayed DE.
  `,
  overview: null,
  image: 'assets/projects/dPSM.jpg',
  repos: 'dPSM',
  technologies: ['MATLAB'],
  detailComponent: null,
};
