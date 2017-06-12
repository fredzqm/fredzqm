import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {ProjectService} from './shared/project.service';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { HelloComponent } from './hello/hello.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { TruncatePipe } from './shared/trunc.pipe';

import { Routes, RouterModule } from '@angular/router';
import { routes } from './route.module';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    ProjectListComponent,
    HelloComponent,
    HomeComponent,
    DetailComponent,
    ProjectsComponent,
    AboutComponent,
    ErrorComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
