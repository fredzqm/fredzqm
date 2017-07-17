import {Component} from '@angular/core';
import {Project} from '../project';

@Component({
  selector: 'app-jobee-project',
  templateUrl: './jobee-project.component.html',
  styleUrls: ['./jobee-project.component.css']
})
export class JobeeProjectComponent {

  constructor() {
  }
}


export const jobeeProject: Project = {
  name: 'Jobee',
  information: `This is an Android app for sharing resumes via QR code. There are two part of the app -- recruiter side and job seeker side. The job seeker can post their resumes and generate QR code. The recruiter can post jobs and accept job applicant by scanning the QR code. I also built notification system with Firebase cloud messaging`,
  overview: null,
  image: 'assets/projects/jobee.png',
  repos: 'jobee',
  technologies: ['Android', 'Gradle', 'Firebase'],
  detailComponent: JobeeProjectComponent
};
