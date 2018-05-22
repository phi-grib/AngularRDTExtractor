import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeTableComponent } from './quantitative-table.component';

describe('QuantitativeTableComponent', () => {
  let component: QuantitativeTableComponent;
  let fixture: ComponentFixture<QuantitativeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantitativeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
