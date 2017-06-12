import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component'

// const routes: Routes = [
// 	{
//     path: 'projects',
//     component: ProjectListComponent
//   }
// ];

import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import {Routes} from "@angular/router";

export const routes : Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id',  component: DetailComponent },
  { path: 'projects',  component: ProjectsComponent },
  { path: 'about',  component: AboutComponent },
  { path: '**', component: ErrorComponent }
];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class Route { }
