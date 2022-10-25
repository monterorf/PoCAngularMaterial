import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../_models/Employee';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  employeeForm !: FormGroup;
  employee !: Employee;
  actionBtn : string = "Save";

  
  
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef: MatDialogRef<UserFormComponent>) { }
  


  ngOnInit(): void {
    this.initForms();
    if(this.editData){
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['employeSince'].setValue(this.editData.employeeSince);
      this.employeeForm.controls['area'].setValue(this.editData.area);   
      this.employeeForm.controls['location'].setValue(this.editData.location);     
      this.employeeForm.controls['manager'].setValue(this.editData.manager);  
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
            this.snackbar.open('Employee has been saved successfully');
            this.employeeForm.reset();
            this.dialogRef.close('save');

          },
          error:()=>{
            this.snackbar.open('Error while adding Employee');
          }
        })
    }else{
      this.updateEmployee();
    }
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeForm.value,this.editData.id).subscribe({
      next:(res)=>{
        this.snackbar.open('Employee has been updated successfully','dismiss');
        this.employeeForm.reset();
        this.dialogRef.close('update');
      
    },
    error:()=>{
      alert("Error while updating employee informatyion1")
    }
    });  
  }

}
