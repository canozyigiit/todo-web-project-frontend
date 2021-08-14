import { Employee } from './../models/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 

  apiUrl = "https://localhost:44334/api/employees/"
  constructor(private httpClient:HttpClient) { }

  getUserById(userId: number): Observable<SingleResponseModel<Employee>> {
    let newUrl = this.apiUrl+'getbyuserid?id='+userId;
    return this.httpClient.get<SingleResponseModel<Employee>>(newUrl);
  }
}
