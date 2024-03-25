import { Injectable } from '@angular/core';
import { PaymentOutputDto } from '../model/payment-output-dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
payment:PaymentOutputDto=new PaymentOutputDto();
  constructor() { }
  getPaymentDetails(){
    return this.payment;
  }
  setPaymentDetails(payment:PaymentOutputDto){
this.payment=payment;
  }
}
