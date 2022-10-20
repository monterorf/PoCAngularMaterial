import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any){
    return this.http.post<any>("http://localhost:3000/employeesList/", data);
  }

  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employeesList");
  }

  updateEmployee(data:any,id:number){
    console.log("From the update, data ",data)
    return this.http.put<any>("http://localhost:3000/employeesList/"+id, data);
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:3000/employeesList/"+id);
  }

}
