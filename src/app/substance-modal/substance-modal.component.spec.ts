import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstanceModalComponent } from '../substance-modal/substance-modal.component';

describe('SubstanceModalComponent', () => {
  let component: SubstanceModalComponent;
  let fixture: ComponentFixture<SubstanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
