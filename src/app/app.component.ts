import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NstInfoFormComponent } from './nst-info-form/nst-info-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  title = 'PoCMatDialogForm';
  displayedColumns: string[] = ['email','firstName','lastName', 'employeeSince', 'position','area','location','manager','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private employeeService: EmployeeService, private snackBar: MatSnackBar) {

  }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(): void {
    this.getEmployees();
  }


  

  openDialog() {
    const dialogRef = this.dialog.open(NstInfoFormComponent,{width:'60%'})
    .afterClosed().subscribe(val=>{
      if(val==='save') {
        this.getEmployees();
      }
    });

  }

  getEmployees() {
    this.employeeService.getEmployee()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err)=>{
          alert("Error while fetching records!")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(row: any){
    this.dialog.open(NstInfoFormComponent,{
        width:'80%',
        data: row}).afterClosed().subscribe(val=>{
          if(val==='update'){
            this.getEmployees();
          }
        })
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe({
      next:(res)=>{
        this.snackBar.open('Employee has been removed successfully','Dismiss');
        this.getEmployees();
      },
      error:()=>{
        this.snackBar.open('Error while removing Employee','Dismiss');
      }
    })
  }

}
