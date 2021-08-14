import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'app/models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  apiUrl = "https://localhost:44334/api/managements/"
  constructor(private httpClient: HttpClient) { }

  // todoAppointe(todoId:number, employeeId:number): Observable<ResponseModel> {
  //   return this.httpClient.post<ResponseModel>(this.apiUrl + "todoappointe?todoId=" + todoId + "&employeeId=" + employeeId)
  // }
  todoAppointe(
    todoId: number,
    employeeId: number
  ): Observable<ResponseModel> {
    let newPath =
      this.apiUrl +
      "todoappointe?todoId="  +
      todoId +
      "&employeeId=" +
      employeeId;
    return this.httpClient.options<ResponseModel>(newPath);
  }


}
