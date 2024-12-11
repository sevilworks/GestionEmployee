import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDepartmentComponent } from './ajout-department.component';

describe('AjoutDepartmentComponent', () => {
  let component: AjoutDepartmentComponent;
  let fixture: ComponentFixture<AjoutDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
