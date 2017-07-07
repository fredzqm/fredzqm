import {
  AfterContentInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Project} from '../shared/project';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements AfterContentInit {
  @Input() project: Project;

  @ViewChild('customizable', { read: ViewContainerRef})
  custimizableDirective: ViewContainerRef;

  constructor(private route: ActivatedRoute,
              private _projectService: ProjectService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterContentInit() {
    const id = +this.route.snapshot.params['id'];
    this._projectService.getOneProject(id).then(project => {
      this.project = project;
      this.custimizableDirective.clear();
      this.custimizableDirective.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.project.detailComponent));
    });
  }
}
