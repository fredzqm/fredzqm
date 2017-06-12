import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  providers: [ProjectService],
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
	projects: Project[];

  constructor(private pservice: ProjectService) {}

  ngOnInit() {
		this.pservice.getProjects().then((projs)=>{
				this.projects = projs;
			});
  }

}
