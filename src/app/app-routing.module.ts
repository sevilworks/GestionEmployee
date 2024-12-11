import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutDepartmentComponent } from './ajout-department/ajout-department.component';

const routes: Routes = [
  { path: 'gestion-departments', component: AjoutDepartmentComponent },
  { path: 'gestion-employees', component: EmployeeDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
