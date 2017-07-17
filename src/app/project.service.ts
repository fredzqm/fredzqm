import {Injectable} from '@angular/core';
import {ourProjects} from './projects';
import {Project} from './project';

@Injectable()
export class ProjectService {
    projectPromise = Promise.resolve(ourProjects);

    getProjects(): Promise<Project[]> {
        return this.projectPromise;
    }

    getOneProjectWithReposName(reposName: string | string): Promise<Project> {
         return this.projectPromise
            .then(project => project.find(p => p.repos === reposName));
    }
}
