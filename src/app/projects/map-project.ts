import {Project} from '../project';

export const mapProejct: Project = {
  name: 'Map Project',
  information: `
  Map project is an attemmpt to solve the classic shortest path problem scalably with Hadoop. 
  We import open street map data into hive and then run my divide-and-conquer algorithm to produce multi-level maps.
  `,
  overview: `
  Map project is an attemmpt to solve the classic shortest path problem scalably with Hadoop. We import open street map data into hive with 
  <a href="https://github.com/PanierAvide/OSM2Hive">OSM2Hive</a>. Then we created scripts to preprocess the data:
  <ol>
    <li>Divide map into smaller maps with certain configurable maximum spots and minimum area.</li>
    <li>Serialized data into customized 2D map data structure, represented as bytearray in hive and pig script.</li>
    <li>Run Warshall's algorithm on each small map and generate the travel distance matrix</li>
    <li>Merge smaller maps into large maps by picking hot spots that tends to be traffic center</li>
  </ol>
  <p>
    The merge algorithm based on the assumption that most quickest path within a block should not pass through non-adjacent blocks.
    This assumption might not be true, but provides a good approximation to save unnecessary computation.
  </p>
  <p class="center">
    &forall; X &isin; {Path from A to B} : |X - B| < 2|X - A| &and; |X - A| < 2|X - B|
  </p>
  <p>
    Through those steps, we were able to create distance matrix data for huge amount of data scalable.
    Both the time and complexity is O(nlogn), and Hadoop can help us parallelize tasks and achieve horizontal scale.
  </p>
  `,
  image: 'assets/projects/osm_logo_wiki.png',
  repos: 'mapproject',
  technologies: ['Hadoop', 'Pig', 'Hive', 'Java', 'Oozie'],
  detailComponent: null,
};
