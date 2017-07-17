import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobeeProjectComponent } from './jobee-project.component';

describe('JobeeProjectComponent', () => {
  let component: JobeeProjectComponent;
  let fixture: ComponentFixture<JobeeProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobeeProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobeeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
