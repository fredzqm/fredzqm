import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterializeModule} from 'angular2-materialize';
import {MatButtonModule, MatToolbarModule, MatTooltipModule, MatMenuModule, MatIconModule, MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ResumeComponent} from './resume/resume.component';
import {ProjectService} from './project.service';
import {ProjectDetailComponent, ProjectDetailRoutingComponent} from './project-detail/project-detail.component';
import {ProjectCardComponent} from './project-list/project-card/project-card.component';
import {HelloComponent} from './hello/hello.component';
import {HomeComponent} from './home/home.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {AboutComponent} from './about/about.component';
import {ErrorComponent} from './error/error.component';
import {TruncatePipe} from './trunc.pipe';

import {Route} from './route.module';
import {MarkdownToHtmlModule} from 'ng2-markdown-to-html';
import {PageHeaderComponent} from './page-header/page-header.component';
import {PageFooterComponent} from './page-footer/page-footer.component';

import {ourProjects} from './projects';
import {TechnologyService} from './technology.service';
import {ReadMeComponent} from './read-me/read-me.component';

const projectDetailComponentList = [ReadMeComponent];
for (const project of ourProjects) {
  if (project.detailComponent) {
    projectDetailComponentList.push(project.detailComponent);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    ProjectDetailRoutingComponent,
    HelloComponent,
    HomeComponent,
    ProjectListComponent,
    AboutComponent,
    ErrorComponent,
    TruncatePipe,
    NavbarComponent,
    PdfViewerComponent,
    ResumeComponent,
    ProjectCardComponent,
    PageHeaderComponent,
    PageFooterComponent,
  ].concat(projectDetailComponentList),
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgbModule.forRoot(),
    Route,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MarkdownToHtmlModule.forRoot(),
    MaterializeModule
  ],
  providers: [ProjectService, TechnologyService],
  bootstrap: [AppComponent],
  entryComponents: projectDetailComponentList
})
export class AppModule {
}
