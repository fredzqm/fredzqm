import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../shared/project';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../shared/project.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;

  constructor(private route: ActivatedRoute, private _projectService: ProjectService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this._projectService.getOneProject(id).then(project => this.project = project);
  }

}
