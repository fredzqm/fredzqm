import {AfterContentInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Project} from '../shared/project';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, AfterContentInit {
  @Input() project: Project;

  @ViewChild('customizable', { read: ViewContainerRef})
  custimizableDirective: ViewContainerRef;

  constructor(private route: ActivatedRoute, private _projectService: ProjectService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this._projectService.getOneProject(id).then(project => {
      this.project = project;
      console.log(this.project);
      console.log(this.custimizableDirective);
      ReactDOM.render(
        this.project.detailComponent,
        this.custimizableDirective.element.nativeElement
      );
    });
  }

  ngAfterContentInit() {
    console.log('customizedComponent');
    console.log(this.custimizableDirective);
  }
}
