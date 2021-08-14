import { SingleResponseModel } from 'app/models/singleResponseModel';
import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'app/models/listResponseModel';
import { Todo } from 'app/models/todo';
import { TodoDetails } from 'app/models/todoDetail'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = "https://localhost:44334/api/todos/"
  constructor(private httpClient: HttpClient) { }
  add(todo:Todo):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add",todo )
  }
  delete(todo:Todo):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete",todo )
  }
  update(todo:Todo):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update",todo )
  }
  
  
  getAll():Observable<ListResponseModel<Todo>> {
    return this.httpClient.get<ListResponseModel<Todo>>(this.apiUrl + "getAll");

  }

  getTodos():Observable<ListResponseModel<Todo>> {
    return this.httpClient.get<ListResponseModel<Todo>>(this.apiUrl + "getalldetails");

  }
  GetAllIsEndedFalse():Observable<ListResponseModel<Todo>> {
    return this.httpClient.get<ListResponseModel<Todo>>(this.apiUrl + "GetAllIsEndedFalse");

  }
  GetAllIsEndedTrue():Observable<ListResponseModel<Todo>> {
    return this.httpClient.get<ListResponseModel<Todo>>(this.apiUrl + "GetAllIsEndedTrue");

  }
  GetAllIsAppointedFalse():Observable<ListResponseModel<Todo>> {
    return this.httpClient.get<ListResponseModel<Todo>>(this.apiUrl + "GetAllIsAppointedFalse");

  }
  GetAllByManagerId(id:number):Observable<ListResponseModel<TodoDetails>> {
    return this.httpClient.get<ListResponseModel<TodoDetails>>(this.apiUrl + "GetAllByManagerId?id=" + id);

  }

  GetAllByEmployeeId(id:number):Observable<ListResponseModel<Todo>> {
    return this.httpClient.get<ListResponseModel<Todo>>(this.apiUrl + "GetAllByEmployeeId?id=" + id);

  }
  GetAllIsAppointedTrue():Observable<ListResponseModel<Todo>> {
    return this.httpClient.get<ListResponseModel<Todo>>(this.apiUrl + "GetAllIsAppointedTrue");

  }
  GetById(id:number):Observable<SingleResponseModel<Todo>> {
    return this.httpClient.get<SingleResponseModel<Todo>>(this.apiUrl + "GetById?id=" + id);

  }
 
}
