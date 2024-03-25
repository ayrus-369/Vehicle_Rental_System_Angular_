import { Car } from "./car";

export class PaymentOutputDto 
{
    
   constructor(
    public amount?:number,
    public dateTime?:string,
    public orderId?:string,
    public vehicle?:Car){}
}
// this.orderId = orderId;
//         this.amount = amount;
//         this.dateTime = dateTime;
//         this.vehicle = vehicle;