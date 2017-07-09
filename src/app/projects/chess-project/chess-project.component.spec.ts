import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessProjectComponent } from './chess-project.component';

describe('ChessProjectComponent', () => {
  let component: ChessProjectComponent;
  let fixture: ComponentFixture<ChessProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
