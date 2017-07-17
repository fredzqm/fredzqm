import {Project} from '../project';

export const jobeeProject: Project = {
  name: 'Jobee',
  information: `This is an Android app for sharing resumes via QR code. There are two part of the app -- recruiter side and job seeker side. The job seeker can post their resumes and generate QR code. The recruiter can post jobs and accept job applicant by scanning the QR code. I also built notification system with Firebase cloud messaging`,
  overview: null,
  image: 'assets/projects/jobee.png',
  repos: 'jobee',
  technologies: ['Android', 'Gradle', 'Firebase'],
  detailComponent: null
};
