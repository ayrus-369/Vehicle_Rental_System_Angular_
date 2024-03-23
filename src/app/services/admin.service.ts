import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  getAdmin():Observable<any>{
return this.http.get("http://localhost:8090/admin");
  }
  updateAdmin(admin:Admin):Observable<any>{
    return this.http.put("http://localhost:8090/admin",admin);}
}
