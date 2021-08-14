import { UserOperationClaim } from './../models/userOperationClaim';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  apiUrl = "https://localhost:44334/api/useroperationclaims/"
  constructor(private httpClient:HttpClient) { }


  
    
  GetByUserClaimEmail(email:string):Observable<SingleResponseModel<UserOperationClaim>>{
    let newPath = this.apiUrl+'GetByUserClaimEmail?email='+email;
    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(newPath);
  }
  
}
