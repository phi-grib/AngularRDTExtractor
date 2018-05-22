import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitativeTableComponent } from './qualitative-table.component';

describe('QualitativeTableComponent', () => {
  let component: QualitativeTableComponent;
  let fixture: ComponentFixture<QualitativeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitativeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
