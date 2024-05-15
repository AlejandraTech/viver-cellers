import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationNurserymanComponent } from './information-nurseryman.component';

describe('InformationNurserymanComponent', () => {
  let component: InformationNurserymanComponent;
  let fixture: ComponentFixture<InformationNurserymanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationNurserymanComponent]
    });
    fixture = TestBed.createComponent(InformationNurserymanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
