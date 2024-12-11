import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee-dashboard.modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !:FormGroup;
  employeeModelObj :EmployeeModel=new EmployeeModel();
  employeeData !:any;
  currentMaxId: number = 0;
  currentPage: number = 1;
  pageSize: number = 5; // Nombre d'employés par page
  totalEmployees: number = 0;
  totalPages: number = 0;
  //declaration des vars du fltre
  //employeeDataT: any[] = []; // Toutes les données des employés
  filteredEmployeeData: any[] = []; // Les employés après filtrage
  // Liste filtrée des employés
  //filteredEmployees = [...this.employeeData];
  searchTerm: string = ''; // Terme de recherche
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
   this.formValue=this.formbuilder.group({
   firstName : [''],
   lastName : [''],
   email : [''],
   mobile : [''],
   salary : ['']
   })
   this.getAllEmployee();
  }
  onEdit(row : any){
    this.employeeModelObj.id=row.id;

    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    }
    updateEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
    alert("Update successfuly");
    this.getAllEmployee();
    })
    }
  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    // Générer un ID unique pour le nouvel employé en incrémentant un compteur
    this.employeeModelObj.id = ++this.currentMaxId;
    // Incrémenter le compteur à chaque ajout
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
    console.log(res);
    alert("employee added successfully")
    },err=>{
    alert("something went wrong");
    })
    }
    getAllEmployee() {
      this.api.getALLEmployee().subscribe(res => {
      this.employeeData = res;

      // Find the maximum ID from the retrieved data
      if (this.employeeData && this.employeeData.length > 0) {
      const maxId = Math.max(...this.employeeData.map((emp: any) => emp.id));
      this.currentMaxId = maxId;
      }
      });
      this.employeeData=this.filteredEmployeeData;
      }

   deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
    alert("Employee deleted");
    this.getAllEmployee();
    })
}
filterEmployees() {
  const term = this.searchTerm.toLowerCase();
  this.filteredEmployeeData = this.employeeData.filter((employee: { firstName:
  string; lastName: string; email: string; mobile: string | string[]; }) => {
  return (
  employee.firstName.toLowerCase().includes(term) ||
  employee.lastName.toLowerCase().includes(term) ||
  employee.email.toLowerCase().includes(term) ||
  employee.mobile.includes(term)
  );
  });
  this.employeeData=this.filteredEmployeeData;
  }
}
