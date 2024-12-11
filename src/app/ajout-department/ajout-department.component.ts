import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { DepartmentModel } from './ajout-departments.module';

@Component({
  selector: 'app-ajout-department',
  templateUrl: './ajout-department.component.html',
  styleUrls: ['./ajout-department.component.css']
})
export class AjoutDepartmentComponent implements OnInit {
  formValue !:FormGroup;
  departmentModelObj :DepartmentModel=new DepartmentModel();
  departmentData !:any;
  currentMaxId: number = 0;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }
  getAllDepartments() {
    this.api.getALLDepartments().subscribe(res => {
    this.departmentData = res;
    if (this.departmentData && this.departmentData.length > 0) {
    const maxId = Math.max(...this.departmentData.map((dep: any) => dep.id));
    this.currentMaxId = maxId;
    }
    });
    }
  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
    departmentName : [''],
    })
    this.getAllDepartments();
   }
   postDepartmentsDetails(){
    this.departmentModelObj.departmentName=this.formValue.value.departmentName;
    this.departmentModelObj.id = ++this.currentMaxId;
    this.api.postDepartment(this.departmentModelObj)
    .subscribe(res=>{
    console.log(res);
    alert("department added successfully")
    },err=>{
    alert("something went wrong");
    })
    }

    onEdit(row : any){
      this.departmentModelObj.id=row.id;
      this.formValue.controls['departmentName'].setValue(row.departmentName);
      this.getAllDepartments();
      }

    updateDepartmentDetails(){
      this.departmentModelObj.departmentName=this.formValue.value.DepartmentName;
      this.api.updateDepartment(this.departmentModelObj,this.departmentModelObj.id)
      .subscribe(res=>{
      alert("Update successfuly");
      this.getAllDepartments();
      })
      }



    deleteDepartment(row : any){
      this.api.deleteDepartment(row.id)
      .subscribe(res=>{
      alert("Department deleted");
      this.getAllDepartments();
      })
  }

}
