import {NgModule} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {AboutComponent} from './about/about.component';
import {ErrorComponent} from './error/error.component';
import {RouterModule, Routes} from '@angular/router';
import {ResumeComponent} from './resume/resume.component';
import {ProjectDetailRoutingComponent} from './project-detail/project-detail.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'detail/:repos', component: ProjectDetailRoutingComponent},
  {path: 'projects', component: ProjectListComponent},
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
