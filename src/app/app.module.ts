import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Route } from './route.module';
import { AppComponent } from './app.component';
import { ProjectService } from './project.service';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    Route
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
