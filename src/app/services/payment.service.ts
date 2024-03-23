import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { 
  }
  public createTransaction(amount: number):Observable<any>
  {
    return this.httpClient.get("http://localhost:8090/createTranscation/"+amount);
  }

}
