import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/customer';
import { AuthService } from '../../services/auth.service';
import { BookingOutputDto } from '../../model/booking-output-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './display-bookings.component.html',
  styleUrl: './display-bookings.component.css'
})
export class DisplayBookingsComponent implements OnInit {
  constructor(private bookingService:BookingService,private activatedRoute:ActivatedRoute,private authService:AuthService){}
  id:string|null="";
  customer:Customer=new Customer();
  bookings: BookingOutputDto[] = [];
  email:string|null="";
  ngOnInit() :void{
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("User:" + this.id);
      let id: number = Number(this.id || '0');
      console.log(id);
      this.authService.getAccountById(id).subscribe(
        {
          next: (data) => {
            console.log(data);
            this.customer=data;
            this.getBookingList();
          },
          error: (err) => {
            console.log(err);
            // this.errorMessage = err.message;
            // this.customer=undefined;
          }
        }
      )
    
    this.getBookingList();
  }
  getBookingList()
  { 
    let email:string=this.customer.email??"";
    this.bookingService.getAllBookingByEmail(email).subscribe({
    next:(response)=>{
      console.log(response);
      this.bookings=response;
      },
   
      error:(err: any)=>{
      
      console.log(err);
      },
      complete:()=>{
      console.log("Server completed sending data");
      }
    })
  }


}
