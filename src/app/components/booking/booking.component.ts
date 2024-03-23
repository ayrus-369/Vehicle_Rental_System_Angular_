import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { BookInputDto } from '../../model/book-input-dto';



declare var Razorpay:any;
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookInputDto:BookInputDto=new BookInputDto;
  
  constructor(private paymentService:PaymentService){
    
  }
  //connect api 
  bookNow(orderForm:NgForm){
    let amount=5000;
    this.paymentService.createTransaction(amount).subscribe({
      next:(response)=>{
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
  openTransactionalModel(response:any)
  {
    var options = {
      order_id:response.order_id,
      key:response.key,
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
  }
}
