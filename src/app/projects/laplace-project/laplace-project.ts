import {Project} from "../../project";
import {LaplaceProjectComponent} from './laplace-project.component';

export const laplaceProejct: Project = {
  name: 'Numerical Inverse Laplace Transform',
  information: `This is a mathematical research project about computing inverse laplace transform through numerical method. Based on Post’s Inversion Formula, we are trying to approximate inverse Laplace transform by solving high order differential equations. I built a MATLAB model that uses Picard Iteration to solve high order differential equations that consists of only plus, multiple operation. It can be shown that every differential equation can be converted into such form.`,
  overview: `
 <p>
 This is a mathematical research project about computing inverse laplace transform through numerical method. I was invited by Dr. Isaia to work on this project. Based on Post’s Inversion Formula, we tried to approximate inverse Laplace transform by solving high order differential equations. I built a MATLAB model that uses Picard Iteration to solve high order differential equations that consists of only plus, multiple operation. It can be shown that every differential equation can be converted into such form.
 </p>
 <p>
 The image on the left is the result of computing <img height="50px" src="paper/example.png">. The red dots is the expectated value, and the blue line is the computed result through Post's Inversion formula.
</p>
  `,
  image: 'assets/projects/laplace-example.png',
  repos: 'laplace',
  technologies: ["MATLAB"],
  detailComponent: LaplaceProjectComponent,
};
