import {
  AfterContentInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import {Project} from '../projects/project';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../projects/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements AfterContentInit {
  _project: Project;
  @Input() set project(project: Project) {
    this._project = project;
    this.updateCustomizedComponent();
  }

  get project(): Project {
    return this._project;
  }

  @ViewChild('customizable', {read: ViewContainerRef})
  custimizableComponent: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterContentInit() {
    this.updateCustomizedComponent();
  }

  updateCustomizedComponent() {
    if (this.project) {
      if (this.project.detailComponent) {
        this.custimizableComponent.clear();
        this.custimizableComponent.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.project.detailComponent));
      }
    }
  }
}

@Component({
  template: `
    <app-project-detail *ngIf="project" [project]="project"></app-project-detail>
  `
})
export class ProjectDetailRoutingComponent implements OnInit {
  project: Project;

  constructor(private route: ActivatedRoute,
              private _projectService: ProjectService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this._projectService.getOneProject(id).then(project => {
      this.project = project;
    });
  }
}
