import {Type} from '@angular/core';

export interface Project {
  name: string;
  information: string;
  overview: string;
  image: string;
  repos: string;
  technologies: string[];
  detailComponent: Type<any>;
}
