import { Injectable } from '@angular/core';
import { ourProjects } from './projects';
import {Project} from './project';

@Injectable()
export class ProjectService {
    projectPromise = Promise.resolve(ourProjects);

    getProjects(): Promise<Project[]> {
        return this.projectPromise;
    }

    getOneProject(id: number | string): Promise<Project> {
         return this.projectPromise
            .then(project => project.find(p => p.id === +id));
    }
}
