import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UMLGeneratorProjectComponent } from './uml-generator-project.component';

describe('UMLGeneratorProjectComponent', () => {
  let component: UMLGeneratorProjectComponent;
  let fixture: ComponentFixture<UMLGeneratorProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UMLGeneratorProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UMLGeneratorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
