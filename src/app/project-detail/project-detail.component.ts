import {
  AfterContentInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import {Project} from '../projects/project';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../projects/project.service';
import {TechnologyService} from "app/technology.service";
import {Technology} from "../home/technology";
import {ReadMeComponent} from '../read-me/read-me.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements AfterContentInit {
  @ViewChild('customizable', {read: ViewContainerRef})
  custimizableComponent: ViewContainerRef;

  technologies: Technology[];
  _project: Project;
  @Input() set project(project: Project) {
    this._project = project;
    this.updateCustomizedComponent();
    if (this.project) {
      this.technologies = this.project.technologies.map((name) => this.technologyService.getTechnologyByName(name));
    } else {
      this.technologies = [];
    }
  }

  get project(): Project {
    return this._project;
  }


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private technologyService: TechnologyService) {
  }

  ngAfterContentInit() {
    this.updateCustomizedComponent();
  }

  updateCustomizedComponent() {
    if (this.project) {
      if (this.project.detailComponent) {
        this.custimizableComponent.clear();
        this.custimizableComponent.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.project.detailComponent));
      } else {
        this.custimizableComponent.clear();
        const component = this.custimizableComponent.createComponent(this.componentFactoryResolver.resolveComponentFactory(ReadMeComponent));
        (<ReadMeComponent>component.instance).repos = this.project.repos;
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
    const repos = this.route.snapshot.params['repos'];
    this._projectService.getOneProjectWithReposName(repos).then(project => {
      this.project = project;
    });
  }
}
