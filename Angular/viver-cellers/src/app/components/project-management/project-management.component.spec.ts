import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementComponent } from './project-management.component';

describe('ProjectManagementComponent', () => {
  let component: ProjectManagementComponent;
  let fixture: ComponentFixture<ProjectManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagementComponent]
    });
    fixture = TestBed.createComponent(ProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
