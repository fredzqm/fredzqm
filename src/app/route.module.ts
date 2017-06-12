import {NgModule} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {DetailComponent} from './detail/detail.component';
import {ProjectsComponent} from './projects/projects.component';
import {AboutComponent} from './about/about.component';
import {ErrorComponent} from './error/error.component';
import {RouterModule, Routes} from "@angular/router";
import {ResumeComponent} from "./resume/resume.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'resume', component: ResumeComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class Route {
}
