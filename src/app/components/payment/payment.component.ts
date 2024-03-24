import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Payment } from '../../model/payment';
import { Observable } from 'rxjs';
import { PaymentOutputDto } from '../../model/payment-output-dto';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../model/customer';
import { BookingService } from '../../services/booking.service';
import { BookingOutputDto } from '../../model/booking-output-dto';



declare var Razorpay:any;
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  {
  paymnetInputDto:Payment=new Payment();
  id:string|null="";
  carId:string|null="";
  payments: PaymentOutputDto[] = [];
  customer:Customer=new Customer();

  //   payments: PaymentOutputDto[] = [];
  //   ngOnInit() :void{
  //     this.id = this.activatedRoute.snapshot.paramMap.get('id');
  //     console.log("User:" + this.id);
      
  //     this.getPaymentList();
  //   }
  constructor(private paymentService:PaymentService){
    
  }

  
  // ngOnInit() :void{
  //   this.id = this.activatedRoute.snapshot.paramMap.get('id');
  //   console.log("User:" + this.id);
  //   this.carId = this.activatedRoute.snapshot.paramMap.get('carId'); // Corrected to this.carId
  //   console.log("Vehicle:" + this.carId);
    
  //   this.Payment();
  // }
  //connect api 
  Payment(){
    this.paymnetInputDto.bookingId=1;
    this.paymnetInputDto.amount=5000;
    console.log(this.paymnetInputDto);
    this.paymentService.createTransaction(this.paymnetInputDto).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.openTransactionalModel(response);
        // this.message="Account added Successfully!....";
        },
     
        error:(err: any)=>{
        
        console.log(err);
        // this.message="Error Accured While Adding Account"
        // this.errorMessage=err.error
        },
        complete:()=>{
        console.log("Server completed sending data");
        }
      })
  }
 
  // getPaymnetList()
  // {
  //   let id: number = Number(this.id || '0');
  //   let carId: number = Number(this.carId || '0');
  //    this.paymentService.getAllUserPaymentById(id).subscribe({
  //   next:(response)=>{
  //     console.log(response);
  //     this.payments = response;
  //     // this.message="Account added Successfully!....";
  //     },
   
  //     error:(err: any)=>{
      
  //     console.log(err);
  //     // this.message="Error Accured While Adding Account"
  //     // this.errorMessage=err.error
  //     },
  //     complete:()=>{
  //     console.log("Server completed sending data");
  //     }
  //   })
  // }
  openTransactionalModel(response:any)
  {
    var options = {
      order_id:response.order_id,
      key:'rzp_test_TfpzfgmJsWW9Kg',
      amount:response.amount,
      currency:response.currency,
      name:'Payment',
      description:'Using Razor Payment',
      image:'homepage.jpg',
      handler:(response:any)=>{
        this.processResponse(response);

      },
      prefill :{
        name:'JOHN DOE',
        email:'John2204@gmail.com',
        Contact:'9876556726'
      },
      notes:{
        address:'Car Rental Service'
      },
      theme:{
        color:'#31d2f2'
      }

    };
    var razorPayObject=new Razorpay(options);
    razorPayObject.open()
  }
  
  processResponse(resp:any){
    console.log(resp);
    alert('Payment success');
  }

}
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { PaymentService } from '../../services/payment.service';
// import { PaymentOutputDto } from '../../model/payment-output-dto';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-display-payments',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './display-payments.component.html',
//   styleUrl: './display-payments.component.css'
// })
// export class DisplayPaymentsComponent implements OnInit
// {
//   constructor(private paymentService:PaymentService,private activatedRoute:ActivatedRoute){}
//   id:string|null="";

//   payments: PaymentOutputDto[] = [];
//   ngOnInit() :void{
//     this.id = this.activatedRoute.snapshot.paramMap.get('id');
//     console.log("User:" + this.id);
    
//     this.getPaymentList();
//   }
 

// }
