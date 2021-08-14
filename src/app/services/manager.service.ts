import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manager } from 'app/models/manager';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  
  apiUrl = "https://localhost:44334/api/managers/"
  constructor(private httpClient:HttpClient) { }

  getUserById(userId: number): Observable<SingleResponseModel<Manager>> {
    let newUrl = this.apiUrl+'GetByUserId?id='+userId;
    return this.httpClient.get<SingleResponseModel<Manager>>(newUrl);
  }
  getByMail(mail: string): Observable<SingleResponseModel<Manager>> {
    let newUrl = this.apiUrl+'GetByMail?mail='+mail;
    return this.httpClient.get<SingleResponseModel<Manager>>(newUrl);
  }
}
