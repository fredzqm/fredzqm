import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MdButtonModule, MdToolbarModule, MdTooltipModule, MdMenuModule, MdIconModule, MdCardModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PdfViewerComponent} from 'ng2-pdf-viewer';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ResumeComponent} from './resume/resume.component';
import {ProjectService} from './shared/project.service';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectCardComponent} from './project-card/project-card.component';
import {HelloComponent} from './hello/hello.component';
import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {AboutComponent} from './about/about.component';
import {ErrorComponent} from './error/error.component';
import {TruncatePipe} from './shared/trunc.pipe';

import {Route} from './route.module';
import {MarkdownToHtmlModule} from 'ng2-markdown-to-html';
import {PageHeaderComponent} from './page-header/page-header.component';
import {PageFooterComponent} from './page-footer/page-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    HelloComponent,
    HomeComponent,
    ProjectsComponent,
    AboutComponent,
    ErrorComponent,
    TruncatePipe,
    NavbarComponent,
    PdfViewerComponent,
    ResumeComponent,
    ProjectCardComponent,
    PageHeaderComponent,
    PageFooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgbModule.forRoot(),
    Route,
    MdToolbarModule,
    MdButtonModule,
    MdTooltipModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule,
    MarkdownToHtmlModule.forRoot(),
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
