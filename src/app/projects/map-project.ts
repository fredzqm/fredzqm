import {Project} from '../project';

export const mapProejct: Project = {
  name: 'Map project',
  information: `I was trying to solve the classic shortest path problem scalably with hadoop. I import data from open street map and then run my divide-and-conquer approximation of Warshall's algorithm O(nlogn) to produce 2D matrix at difference layer. Thus, we can fetch the travel-distance between any arbitrary location, and fastest route in O(1)`,
  overview: null,
  image: 'assets/projects/osm_logo_wiki.png',
  repos: 'mapproject',
  technologies: ['Java', 'Hadoop', 'Pig', 'Hive', 'Oozie'],
  detailComponent: null,
};
