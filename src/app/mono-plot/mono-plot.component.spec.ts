import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonoPlotComponent } from './mono-plot.component';

describe('MonoPlotComponent', () => {
  let component: MonoPlotComponent;
  let fixture: ComponentFixture<MonoPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonoPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonoPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
