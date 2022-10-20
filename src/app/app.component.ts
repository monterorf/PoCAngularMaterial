import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import { UserFormComponent } from './user-form/user-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  title = 'PoCMatDialogForm';
  displayedColumns: string[] = ['firstName','lastName', 'dateOfBirth', 'gender','address','zipCode','university','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private employeeService: EmployeeService) {

  }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(): void {
    this.getEmployees();
  }


  

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent,{width:'80%'})
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
    this.dialog.open(UserFormComponent,{
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
        alert("Employee was removed successfully");
        this.getEmployees();
      },
      error:()=>{
        alert("Error while removing employee");
      }
    })
  }

}
