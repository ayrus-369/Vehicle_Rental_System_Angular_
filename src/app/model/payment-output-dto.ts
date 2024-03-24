import { Car } from "./car";

export class PaymentOutputDto 
{
    public orderId?:string;
    public amount?:number;
    public dateTime?:string;
    public vehicle?:Car;
   
}
// this.orderId = orderId;
//         this.amount = amount;
//         this.dateTime = dateTime;
//         this.vehicle = vehicle;