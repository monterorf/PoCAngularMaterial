import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { enableDebugTools } from '@angular/platform-browser';
import { EmployeeService } from '../services/employee.service';
import { NstInfo } from '../_models/NstInfo';

@Component({
  selector: 'app-nst-info-form',
  templateUrl: './nst-info-form.component.html',
  styleUrls: ['./nst-info-form.component.scss']
})
export class NstInfoFormComponent implements OnInit {
  nstInfoForm !: FormGroup;
  actionBtn : string = "Save";
  nstInfo !: NstInfo;
  managers !: any;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef: MatDialogRef<NstInfoFormComponent>) { }

  ngOnInit(): void {
    this.initForms();
    this.getManagers(); 
    console.log(this.editData)  

    if(this.editData){
      this.nstInfoForm.controls['firstName'].setValue(this.editData.firstName);
      this.nstInfoForm.controls['lastName'].setValue(this.editData.lastName);
      this.nstInfoForm.controls['employeeSince'].setValue(this.editData.employeeSince);
      this.nstInfoForm.controls['area'].setValue(this.editData.area);   
      this.nstInfoForm.controls['location'].setValue(this.editData.location);     
      this.nstInfoForm.controls['position'].setValue(this.editData.position); 
      this.nstInfoForm.controls['manager'].setValue(this.editData.manager);  
      this.nstInfoForm.controls['address'].setValue(this.editData.address);  
      this.nstInfoForm.controls['zipCode'].setValue(this.editData.zipCode);  
      this.nstInfoForm.controls['university'].setValue(this.editData.university);  
      this.nstInfoForm.controls['enabled'].setValue(this.editData.enabled);  
      this.nstInfoForm.controls['bench'].setValue(this.editData.bench);  
      this.nstInfoForm.controls['billable'].setValue(this.editData.billable);  
      this.nstInfoForm.controls['reports'].setValue(this.editData.reports);  

      this.actionBtn = "Update"
      console.log(this.editData)
    }

  }

  getManagers() {
    this.managers = this.employeeService.getManagers();
  }

  initForms() {
    this.nstInfoForm = this.formBuilder.group({
      controlId:123123,
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      position:['',Validators.required],
      employeeSince:['',Validators.required],
      area:['',Validators.required],
      location: ['', Validators.required],
      manager: ['', Validators.required],
      address: ['',Validators.required],
      zipCode: ['',Validators.required],
      university: ['',Validators.required],
      enabled: [false],
      billable: [false],
      reports: [false],
      bench: [false],
    });
    
  }


  addNstInfo(){
    if(!this.editData){
          this.nstInfo = this.nstInfoForm.value;
          this.nstInfo.email = this.generateEmail();
          this.employeeService.postEmployee(this.nstInfo).subscribe({
          next:(res)=>{
            this.snackbar.open('Employee has been saved successfully','dismiss');
            this.nstInfoForm.reset();
            this.dialogRef.close('save');

          },
          error:()=>{
            this.snackbar.open('Error while adding Employee','dismiss');
          }
        })
    }else{
      this.updateEmployee();
    }
  }

  generateEmail(){
    return 'email@nearshoretechnology.com'
  }


  updateEmployee(){
    this.employeeService.updateEmployee(this.nstInfoForm.value,this.editData.id).subscribe({
      next:(res)=>{
        this.snackbar.open('Employee has been updated successfully','dismiss');
        this.nstInfoForm.reset();
        this.dialogRef.close('update');
      
    },
    error:()=>{
      this.snackbar.open('Error while updating Employee Info','dismiss');
    }
    });  
  }

}
