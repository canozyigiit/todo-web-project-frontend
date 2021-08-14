import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44334/api/users/"
  constructor(private httpClient:HttpClient) { }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {
    let newUrl = this.apiUrl+'getbyid?userId='+userId;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }
  
    
   getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl+'GetByMail?email='+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  isAdmin() {
    if (localStorage.getItem("claim") !==null  &&  localStorage.getItem("claim").indexOf("admin")  ) {
      return true;
    }
    else {
      return false;
    }
  }
  isDirector() {
    if (  localStorage.getItem("claim") !==null && localStorage.getItem("claim").indexOf("director")) {
      return  true;
    }
    else {
      return false;
    }
  }
  isEmployee() {
    if (  localStorage.getItem("employee") !==null){
      return  true;
    }
    else {
      return false;
    }
  }
}
