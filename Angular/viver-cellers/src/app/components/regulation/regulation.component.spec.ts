import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationComponent } from './regulation.component';

describe('RegulationComponent', () => {
  let component: RegulationComponent;
  let fixture: ComponentFixture<RegulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegulationComponent]
    });
    fixture = TestBed.createComponent(RegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
