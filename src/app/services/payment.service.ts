import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Payment } from '../model/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { 
  }
  public createTransaction(paymentInputDto:Payment):Observable<any>
  {
    return this.httpClient.post("http://localhost:8090/createTranscation/customer",paymentInputDto);
  }
  public getAllUserPaymentById(id:number):Observable<any>
  {
    return this.httpClient.get("http://localhost:8090/paymentHistory/"+id);
  }

}
