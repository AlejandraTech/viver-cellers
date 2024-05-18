import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGraphComponent } from './sales-graph.component';

describe('SalesGraphComponent', () => {
  let component: SalesGraphComponent;
  let fixture: ComponentFixture<SalesGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesGraphComponent]
    });
    fixture = TestBed.createComponent(SalesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
