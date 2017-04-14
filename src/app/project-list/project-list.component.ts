import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
	projects: Project[];

  constructor(private pservice: ProjectService) {}

  ngOnInit() {
		this.pservice.getProjects().then((projs)=>{
				this.projects = projs
			});
  }

}
