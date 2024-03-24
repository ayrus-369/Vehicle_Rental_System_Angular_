import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { PaymentOutputDto } from '../../model/payment-output-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-payments',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './display-payments.component.html',
  styleUrl: './display-payments.component.css'
})
export class DisplayPaymentsComponent implements OnInit
{
  constructor(private paymentService:PaymentService,private activatedRoute:ActivatedRoute){}
  id:string|null="";

  payments: PaymentOutputDto[] = [];
  ngOnInit() :void{
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("User:" + this.id);
    
    this.getPaymentList();
  }
 
  getPaymentList()
  {
    let id: number = Number(this.id || '0');
     this.paymentService.getAllUserPaymentById(id).subscribe({
    next:(response)=>{
      console.log(response);
      this.payments = response;
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

}
