import {Project} from '../project';

export const operatingSystemProject: Project = {
  name: 'Operating System',
  information: `
  An old-fashion command-line based operating system project with basic file system and round-robin multiprocess scheduler.
  The project is built with bochs CPU simulator, which simulates the boot process of a computer.
  We use floppya.img to simulate the hard disk storage, and copy some bootload assembly into the first segment, which loads our kernel upon boot.
  `,
  overview: null,
  image: 'assets/projects/OperatingSystem.jpg',
  repos: 'Operating-System',
  technologies: ['C'],
  detailComponent: null
};
