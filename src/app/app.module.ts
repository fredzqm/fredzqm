import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

import {AppComponent} from './app.component';
import {ProjectService} from './shared/project.service';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {HelloComponent} from './hello/hello.component';
import {HomeComponent} from './home/home.component';
import {DetailComponent} from './detail/detail.component';
import {ProjectsComponent} from './projects/projects.component';
import {AboutComponent} from './about/about.component';
import {ErrorComponent} from './error/error.component';
import {TruncatePipe} from './shared/trunc.pipe';

import {Route} from './route.module';
import {MdButtonModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";

import {MdToolbarModule} from '@angular/material';
import {NavbarComponent} from './navbar/navbar.component';
import {ResumeComponent} from './resume/resume.component';


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
    TruncatePipe,
    NavbarComponent,
    PdfViewerComponent,
    ResumeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgbModule.forRoot(),
    Route,
    MdToolbarModule,
    MdButtonModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
