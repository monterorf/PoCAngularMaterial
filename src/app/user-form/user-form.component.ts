import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../_models/Employee';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  employeeForm !: FormGroup;
  personalInfoForm !: FormGroup;
  educationForm !: FormGroup;
  employee !: Employee;
  actionBtn : string = "Save";

  
  
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, 
              @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef: MatDialogRef<UserFormComponent>) { }
  

  ngOnInit(): void {
    this.initForms();
    if(this.editData){
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['dateOfBirth'].setValue(this.editData.dateOfBirth);
      this.employeeForm.controls['address'].setValue(this.editData.address);   
      this.employeeForm.controls['gender'].setValue(this.editData.gender);     
      this.employeeForm.controls['zipCode'].setValue(this.editData.zipCode);  
      this.employeeForm.controls['university'].setValue(this.editData.university);  

      this.actionBtn = "Update"
      console.log(this.editData)
    }
  }


  initForms() {
    this.employeeForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      dateOfBirth:['',Validators.required],
      gender:['',Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      university: ['', Validators.required],
    });
    
  }

  addEmployeeInfo(){
    if(!this.editData){
          this.employee = this.employeeForm.value;
          this.employeeService.postEmployee(this.employee).subscribe({
          next:(res)=>{
            alert("Employee has been added successfully");
            this.employeeForm.reset();
            this.dialogRef.close('save');

          },
          error:()=>{
            alert("Error while adding employee");
          }
        })
    }else{
      this.updateEmployee();
    }
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Employee has been updated successfullly");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      
    },
    error:()=>{
      alert("Error while updating employee informatyion1")
    }
    });  
  }

}
