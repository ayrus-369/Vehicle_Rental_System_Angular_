import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Logintoaccount } from '../model/logintoaccount';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  register(newCustomer:Customer):Observable<any>{
     return this.httpClient.post("http://localhost:8090/customer",newCustomer);   
  }

  login(logindetails:Logintoaccount):Observable<any>
  { 
      return this.httpClient.post("http://localhost:8090/customer/login",logindetails);
  }

  update(updatedCustomer:Customer):Observable<any>{
    return this.httpClient.put("http://localhost:8090/customer/updateProfile",updatedCustomer);
   
 }
 getAccountById(id: number | undefined):Observable<any>{
  return this.httpClient.get("http://localhost:8090/customer/"+id);
}
logout(id: number | undefined):Observable<any>{
  return this.httpClient.get("http://localhost:8090/customer/"+id);
}
AdminLogin(logindetails:Logintoaccount):Observable<any>{
  return this.httpClient.post("http://localhost:8090/admin/login",logindetails);}


}

