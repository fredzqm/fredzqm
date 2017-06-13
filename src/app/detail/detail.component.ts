import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project';

@Component({
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class DetailComponent implements OnInit {
  project: Project;

  constructor(private route: ActivatedRoute, private router: Router, private _projectService: ProjectService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this._projectService.getOneProject(id).then(project => this.project = project);
  }
}
